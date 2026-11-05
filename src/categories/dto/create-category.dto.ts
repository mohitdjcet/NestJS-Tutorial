import {
    IsNotEmpty,
    IsString,
    IsOptional
} from 'class-validator';

export class CreateCategoryDto{
    @IsString()
    @IsNotEmpty()
    name!:string;

    @IsOptional()
    @IsString()
    description?:string
}