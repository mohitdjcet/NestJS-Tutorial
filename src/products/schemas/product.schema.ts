import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema, Types } from 'mongoose';
import { Category } from '../../categories/schemas/category.schema';

@Schema({ timestamps: true })
export class Product {
  @Prop({ required: true, trim: true })
  name!: string;

  @Prop({ default: '', trim: true })
  description!: string;

  @Prop({ required: true, min: 0 })
  price!: number;

  @Prop({ default: 0, min: 0 })
  stock!: number;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: Category.name,
    required: true,
  })
  category!: Types.ObjectId;
}

export const ProductSchema = SchemaFactory.createForClass(Product);