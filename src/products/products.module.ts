import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './schemas/product.schema';
import { UsersModule } from 'src/users/users.module';
import { CategoriesModule } from 'src/categories/categories.module';
import { AdminGuard } from 'src/admin/guards/admin/admin.guard';

@Module({
  imports:[
    MongooseModule.forFeature([
          {
            name: Product.name,
            schema: ProductSchema
          }
        ]),
        UsersModule,
        CategoriesModule
  ],
  controllers: [ProductsController],
  providers: [ProductsService,AdminGuard]
})
export class ProductsModule {}
