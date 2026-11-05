import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateCategoryDto } from './dto/create-category.dto';

@Controller('categories')
export class CategoriesController {
    constructor(
        private categoriesService: CategoriesService,
    ){}


    @UseGuards(JwtAuthGuard)
    @Post()
    create(@Body() createCategoryDto:CreateCategoryDto){
        return this.categoriesService.create(createCategoryDto)
    }

    @Get()
    findAll(){
        return this.categoriesService.findAll()
    }
}
