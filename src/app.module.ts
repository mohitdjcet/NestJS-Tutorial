import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModules } from './user/users.module';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [UsersModules, ProductsModule],
  controllers: [AppController],
  providers: [AppService],
  exports:[]
})
export class AppModule {}
