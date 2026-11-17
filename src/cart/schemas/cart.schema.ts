import { Prop,Schema,SchemaFactory } from "@nestjs/mongoose";
import { Schema as MongooseSchema, Types } from "mongoose";
import { User } from "src/users/schemas/user.schema";
import { Product } from "src/products/schemas/product.schema";

@Schema({ _id:false})
export class CartItem{
    @Prop({
        type:MongooseSchema.Types.ObjectId,
        ref: Product.name,
        required:true
    })
    product!:Types.ObjectId;

    @Prop({
        required:true,
        min:1,
        default:1
    })
    quantity!:number
}

export const CartItemSchema = SchemaFactory.createForClass(CartItem);

@Schema({ timestamps:true})
export class Cart{
    @Prop({
        type:MongooseSchema.Types.ObjectId,
        ref: Product.name,
        required:true,
        unique:true
    })
    user!:Types.ObjectId

    @Prop({
        type:[CartItemSchema],
        default:[]
    })
    items!:CartItem[];
}

export const CartSchema = SchemaFactory.createForClass(Cart);
