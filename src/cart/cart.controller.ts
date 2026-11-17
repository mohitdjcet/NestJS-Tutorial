import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CartService } from './cart.service';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';

@Controller('cart')
@UseGuards(JwtAuthGuard)
export class CartController {
  constructor(private cartService: CartService) {}

  @Post('items')
  addItem(@Request() req: any, @Body() addtoCartDto: AddToCartDto) {
    return this.cartService.addItem(req.user.sub, addtoCartDto);
  }

  @Get()
  getCart(@Request() req: any) {
    return this.cartService.getCart(req.user.sub);
  }

  @Patch('items/:productId')
  updateItem(
    @Request() req: any,
    @Param('productId') productId: string,
    @Body() updateCartDto: UpdateCartDto,
  ) {
    return this.cartService.updateItem(req.user.sub, productId, updateCartDto);
  }

  @Delete('items/:productId')
  removeItem(@Request() req: any, @Param('productId') productId: string) {
    return this.cartService.removeItem(req.user.sub, productId);
  }
}
