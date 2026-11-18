import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';

import { UsersService } from '../users/users.service';
import { OrdersService } from '../orders/orders.service';

import { UpdateOrderStatusDto } from '../orders/dto/update-order-status.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AdminGuard } from './guards/admin/admin.guard';

@Controller('admin')

@UseGuards(JwtAuthGuard, AdminGuard)
export class AdminController {

  constructor(
    private usersService: UsersService,
    private ordersService: OrdersService,
  ) {}

  // GET /api/admin/users
  @Get('users')
  getAllUsers() {
    return this.usersService.findAll();
  }

  // GET /api/admin/orders
  @Get('orders')
  getAllOrders() {
    return this.ordersService.findAll();
  }

  // PATCH /api/admin/orders/:id/status
  @Patch('orders/:id/status')
  updateOrderStatus(
    @Param('id') orderId: string,
    @Body() updateOrderStatusDto: UpdateOrderStatusDto,
  ) {
    return this.ordersService.updateStatus(
      orderId,
      updateOrderStatusDto.status,
    );
  }
}