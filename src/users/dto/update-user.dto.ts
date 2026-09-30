import { IsEmail, IsInt, IsString, Min, IsOptional } from "class-validator";

export class UpdateUserDto{
    @IsOptional()
    @IsString()
    name?:string;

    @IsOptional()
    @IsEmail()
    email?:string;

    @IsOptional()
    @IsInt()
    @Min(18)
    age?:number
}