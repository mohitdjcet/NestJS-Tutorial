import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './schemas/product.schema';
import { Model, Types } from 'mongoose';
import { CategoriesService } from 'src/categories/categories.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name)
    private productModel: Model<Product>,

    private categoriesService: CategoriesService,
  ) {}

  async create(createProductDto: CreateProductDto) {
    const { name, description, price, stock, categoryId } = createProductDto;
    const category = await this.categoriesService.findById(categoryId);
    const product = await this.productModel.create({
      name,
      description: description ?? '',
      price,
      stock: stock ?? 0,
      category: category._id,
    });
    await product.populate('category');
    return {
      message: 'Product Created Succesfully',
      product,
    };
  }

  // ---------------- GET ALL PRODUCTS ----------------
  async findAll() {
    return this.productModel
      .find()
      .populate('category')
      .sort({ createdAt: -1 });
  }

  // ---------------- FIND PRODUCT DOCUMENT ----------------
  private async getProductDocument(id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid product ID');
    }

    const product = await this.productModel.findById(id);

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return product;
  }

  // ---------------- GET PRODUCT BY ID ----------------
  async findOne(id: string) {
    const product = await this.getProductDocument(id);

    await product.populate('category');

    return product;
  }

  // ---------------- UPDATE PRODUCT ----------------
  async update(id: string, updateProductDto: UpdateProductDto) {
    const product = await this.getProductDocument(id);

    if (updateProductDto.categoryId) {
      const category = await this.categoriesService.findById(
        updateProductDto.categoryId,
      );

      product.category = category._id as Types.ObjectId;
    }

    if (updateProductDto.name !== undefined) {
      product.name = updateProductDto.name;
    }

    if (updateProductDto.description !== undefined) {
      product.description = updateProductDto.description;
    }

    if (updateProductDto.price !== undefined) {
      product.price = updateProductDto.price;
    }

    if (updateProductDto.stock !== undefined) {
      product.stock = updateProductDto.stock;
    }

    await product.save();

    await product.populate('category');

    return {
      message: 'Product updated successfully',
      product,
    };
  }

  // ---------------- DELETE PRODUCT ----------------
  async remove(id: string) {
    const product = await this.getProductDocument(id);

    await product.deleteOne();

    return {
      message: 'Product deleted successfully',
    };
  }
}
