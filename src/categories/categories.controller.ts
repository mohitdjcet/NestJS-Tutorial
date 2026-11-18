import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateCategoryDto } from './dto/create-category.dto';
import { AdminGuard } from 'src/admin/guards/admin/admin.guard';

@Controller('categories')
export class CategoriesController {
    constructor(
        private categoriesService: CategoriesService,
    ){}


    @UseGuards(JwtAuthGuard,AdminGuard)
    @Post()
    create(@Body() createCategoryDto:CreateCategoryDto){
        return this.categoriesService.create(createCategoryDto)
    }

    @Get()
    findAll(){
        return this.categoriesService.findAll()
    }
}
