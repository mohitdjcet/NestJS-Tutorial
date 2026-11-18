import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from './schemas/order.schema';
import { Cart, CartSchema } from 'src/cart/schemas/cart.schema';
import { Product, ProductSchema } from 'src/products/schemas/product.schema';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports:[
    MongooseModule.forFeature([
      {
        name:Order.name,
        schema:OrderSchema
      },
      {
        name:Cart.name,
        schema:CartSchema,
      },
      {
        name:Product.name,
        schema:ProductSchema
      }
    ]),
    UsersModule
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
  exports:[OrdersService]
})
export class OrdersModule {}
