import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { UsersModule } from 'src/users/users.module';
import { OrdersModule } from 'src/orders/orders.module';
import { AdminGuard } from './guards/admin/admin.guard';

@Module({
  imports:[
    UsersModule,
    OrdersModule
  ],
  controllers: [AdminController],
  providers:[AdminGuard]
})
export class AdminModule {}
