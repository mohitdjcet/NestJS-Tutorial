import { Module } from '@nestjs/common';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Cart, CartSchema } from './schemas/cart.schema';
import { Product, ProductSchema } from 'src/products/schemas/product.schema';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports:[
    MongooseModule.forFeature([
      {
        name:Cart.name,
        schema:CartSchema
      },
      {
        name:Product.name,
        schema:ProductSchema
      }
    ]),
    UsersModule,
  ],
  controllers: [CartController],
  providers: [CartService]
})
export class CartModule {}
