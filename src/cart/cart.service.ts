import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cart } from './schemas/cart.schema';
import { Model, Types } from 'mongoose';
import { Product } from 'src/products/schemas/product.schema';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';

@Injectable()
export class CartService {
  constructor(
    @InjectModel(Cart.name)
    private cartModel: Model<Cart>,

    @InjectModel(Product.name)
    private productModel: Model<Product>,
  ) {}

  async addItem(userId: string, addToCartDto: AddToCartDto) {
    const { productId, quantity } = addToCartDto;
    const product = await this.productModel.findById(productId);

    if (!product) {
      throw new NotFoundException('Product not found');
    }
    if (quantity > product.stock) {
      throw new NotFoundException('Insufficient product stock');
    }

    let cart = await this.cartModel.findOne({ user: userId });
    if (!cart) {
      cart = new this.cartModel({
        user: userId,
        items: [],
      });
    }
    const existingItem = cart.items.find(
      (item) => item.product.toString() === productId,
    );
    if (existingItem) {
      existingItem.quantity += quantity;
      if (existingItem.quantity > product.stock) {
        throw new NotFoundException('Insufficient product stock');
      }
    } else {
      cart.items.push({
        product: product._id,
        quantity,
      } as any);
    }
    await cart.save();
    await cart.populate('items.product');
    return {
      message: 'Product added to cart successfully',
      cart,
    };
  }

  async getCart(userId: string) {
    const cart = await this.cartModel
      .findOne({ user: userId })
      .populate('items.product')
      .exec();
    if (!cart) {
      return {
        items: [],
        message: 'Cart is Empty',
      };
    }
    return cart;
  }

  async updateItem(
    userId: string,
    productId: string,
    updateCartDto: UpdateCartDto,
  ) {
    const { quantity } = updateCartDto;

    if (!Types.ObjectId.isValid(productId)) {
      throw new BadRequestException('Invalid product ID');
    }

    const product = await this.productModel.findById(productId);

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    if (quantity > product.stock) {
      throw new BadRequestException('Insufficient product stock');
    }

    const cart = await this.cartModel.findOne({ user: userId });

    if (!cart) {
      throw new NotFoundException('Cart not found');
    }

    const item = cart.items.find(
      (item) => item.product.toString() === productId,
    );

    if (!item) {
      throw new NotFoundException('Product not found in cart');
    }

    item.quantity = quantity;

    await cart.save();

    await cart.populate('items.product');

    return {
      message: 'Cart quantity updated successfully',
      cart,
    };
  }

  async removeItem(userId:string,productId:string){
    const cart = await this.cartModel.findOne({ user: userId });

    if (!cart) {
      throw new NotFoundException('Cart not found');
    }
    const initialLength = cart.items.length;
    cart.items = cart.items.filter(
        (item)=> item.product.toString() !== productId
    )
    if(initialLength === cart.items.length){
        throw new NotFoundException("Product not found in cart")
    }
    await cart.save();

    return{
        message:"Product removed fro cart successfully"
    }
  }

}
