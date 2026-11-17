import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { InjectConnection, InjectModel } from '@nestjs/mongoose';

import { Connection, Model, Types } from 'mongoose';

import { Order } from './schemas/order.schema';
import { Cart } from 'src/cart/schemas/cart.schema';
import { Product } from 'src/products/schemas/product.schema';

type OrderItem = {
  product: Types.ObjectId;
  name: string;
  price: number;
  quantity: number;
  lineTotal: number;
};

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order.name)
    private orderModel: Model<Order>,

    @InjectModel(Cart.name)
    private cartModel: Model<Cart>,

    @InjectModel(Product.name)
    private productModel: Model<Product>,

    @InjectConnection()
    private connection: Connection,
  ) {}

  async placeOrder(userId: string) {
    const session = await this.connection.startSession();

    let createdOrder: Order | undefined;

    try {
      await session.withTransaction(async () => {
        const cart = await this.cartModel
          .findOne({ user: userId })
          .session(session);

        if (!cart) {
          throw new NotFoundException('Cart not found');
        }

        if (cart.items.length === 0) {
          throw new BadRequestException('Your cart is empty');
        }

        const orderItems: OrderItem[] = [];

        for (const item of cart.items) {
          const product = await this.productModel
            .findById(item.product)
            .session(session);

          if (!product) {
            throw new NotFoundException('Product no longer exists');
          }

          if (product.stock < item.quantity) {
            throw new BadRequestException(
              `Insufficient stock for ${product.name}`,
            );
          }

          const stockUpdate = await this.productModel.updateOne(
            {
              _id: product._id,
              stock: { $gte: item.quantity },
            },
            {
              $inc: { stock: -item.quantity },
            },
            { session },
          );

          if (stockUpdate.modifiedCount !== 1) {
            throw new BadRequestException(
              `Unable to update stock for ${product.name}`,
            );
          }

          orderItems.push({
            product: product._id,
            name: product.name,
            price: product.price,
            quantity: item.quantity,
            lineTotal: product.price * item.quantity,
          });
        }

        const totalAmount = orderItems.reduce(
          (total, item) => total + item.lineTotal,
          0,
        );

        const orders = await this.orderModel.create(
          [
            {
              user: userId,
              items: orderItems,
              totalAmount,
              status: 'PENDING',
            },
          ],
          { session },
        );

        createdOrder = orders[0];

        cart.items = [];

        await cart.save({ session });
      });

      return {
        message: 'Order placed successfully',
        order: createdOrder,
      };
    } finally {
      await session.endSession();
    }
  }

  async findMyOrders(userId: string) {
    return this.orderModel.find({ user: userId }).sort({ createdAt: -1 });
  }

  async findOne(userId: string, orderId: string) {
    if (!Types.ObjectId.isValid(orderId)) {
      throw new BadRequestException('Invalid order ID');
    }

    const order = await this.orderModel.findOne({
      _id: orderId,
      user: userId,
    });

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    return order;
  }
}
