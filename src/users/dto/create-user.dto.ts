import { IsEmail, IsNotEmpty, IsNumber, IsString, MinLength } from "class-validator";

export class CreateUserDto{
    @IsString()
    @IsNotEmpty()
    name!:string;

    @IsEmail()
    email!:string;

    @MinLength(6)
    password?:string

    @IsNumber()
    age!:number
}