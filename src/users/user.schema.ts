import { Prop,Schema,SchemaFactory } from "@nestjs/mongoose";

@Schema({ timestamps:true})
export class User{
    @Prop({ required:true })
    name!:string;

    @Prop({ required:true,unique:true })
    email!:string;

    @Prop({default:18})
    age!:number;

    @Prop({ required:true })
    password!:string
}

export const UserSchema = SchemaFactory.createForClass(User)