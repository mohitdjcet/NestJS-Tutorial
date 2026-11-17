import {
  Controller,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';

import { OrdersService } from './orders.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('orders')
@UseGuards(JwtAuthGuard)
export class OrdersController {
  constructor(
    private ordersService: OrdersService,
  ) {}

  @Post()
  placeOrder(@Request() req: any) {
    return this.ordersService.placeOrder(req.user.sub);
  }

  @Get('my-orders')
  findMyOrders(@Request() req: any) {
    return this.ordersService.findMyOrders(req.user.sub);
  }

  @Get(':id')
  findOne(
    @Request() req: any,
    @Param('id') orderId: string,
  ) {
    return this.ordersService.findOne(req.user.sub, orderId);
  }
}