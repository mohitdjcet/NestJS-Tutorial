import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose'
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { CategoriesModule } from './categories/categories.module';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true
    }),
    MongooseModule.forRootAsync({
      inject:[ConfigService],
      useFactory:(configService:ConfigService)=>({
        uri:configService.getOrThrow<string>('MONGODB_URI')
      })
    }),
    JwtModule.registerAsync({
      global:true,
      inject:[ConfigService],
      useFactory:(config:ConfigService)=>({
        secret: config.getOrThrow<string>('JWT_SECRET'),
        signOptions:{
          expiresIn:"1d"
        }
      })
    }),
    AuthModule,
    UsersModule,
    CategoriesModule,
    ProductsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
