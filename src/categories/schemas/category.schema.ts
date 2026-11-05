import { Prop,Schema,SchemaFactory } from "@nestjs/mongoose";

@Schema({ timestamps:true})
export class Category{
    @Prop({ required:true,trim:true,unique:true})
    name!:string;

    @Prop({
        default:"",
        trim:true
    })
    description!:string
}

export const CategorySchema = SchemaFactory.createForClass(Category);