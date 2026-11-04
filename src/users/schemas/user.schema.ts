import { Prop,Schema,SchemaFactory } from "@nestjs/mongoose";

@Schema({ timestamps:true})
export class User{
    @Prop({ required:true,trim:true})
    name!:string;

    @Prop({
        required:true,
        unique:true,
        loadClass:true,
        trim:true
    })
    email!:string

    @Prop({ required:true})
    password!:string

    @Prop({ default:"USER", enum:["USER",'ADMIN']})
    role!:string
}

export const UserSchema = SchemaFactory.createForClass(User);