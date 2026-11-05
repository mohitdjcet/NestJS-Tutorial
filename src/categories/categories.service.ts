import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Category } from './schemas/category.schema';
import { Model, Types } from 'mongoose';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoriesService {
    constructor(
        @InjectModel(Category.name)
        private categoryModel:Model<Category>
    ){}

    async create(createCategoryDto:CreateCategoryDto){
        const { name, description }= createCategoryDto;
        const existingCategory = await this.categoryModel.findOne({
            name,
        })
        if ( existingCategory){
            throw new ConflictException("Category already exists");
        }
        const category = await this.categoryModel.create({
            name,
            description: description ?? "",
        })
        return {
            message:"Category created succesfully",
            category,
        }
    }

  async findAll() {
    return this.categoryModel.find().sort({ createdAt: -1 });
  }

  async findById(id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid category ID');
    }

    const category = await this.categoryModel.findById(id);

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    return category;
  }
}
