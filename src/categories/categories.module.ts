import { Module } from '@nestjs/common';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Category, CategorySchema } from './schemas/category.schema';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports:[
    MongooseModule.forFeature([
      {
        name: Category.name,
        schema: CategorySchema
      }
    ]),
    UsersModule
  ],
  controllers: [CategoriesController],
  providers: [CategoriesService],
  exports:[CategoriesService]
})
export class CategoriesModule {}
