import { IsEmail, IsInt, IsNotEmpty, IsString, Min, MinLength } from "class-validator";

export class RegiterDto{
    @IsNotEmpty({
        message:"Name is Required"
    })
    name!:string;

    @IsEmail({},{message:"Please enter a valid email"})
    email!:string

    @IsNotEmpty({message:"Password is required"})
    @MinLength(8,{message:'Password must me at least 8 Chars'})
    password!:string
}