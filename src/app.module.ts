import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { LoggerMiddleware } from './logger/logger.middleware';
@Module({
  imports: [UsersModule, ProductsModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {
  configure(consumer:MiddlewareConsumer){
    consumer
      .apply(LoggerMiddleware)
      .forRoutes(
        'users',
        'products'
      )
  }
}
