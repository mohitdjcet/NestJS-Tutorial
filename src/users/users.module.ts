import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Module({
    imports:[
        TypeOrmModule.forFeature([
            User
        ]),
        JwtModule.registerAsync({
            inject:[ConfigService],
            useFactory: (configService:ConfigService)=>{
                const secret = configService.get<string>("JWT_SECRET");
                if(!secret){
                    throw new Error('JWT secret is not configure')
                }
                return {
                    secret,
                    signOptions:{
                        expiresIn:'15m',
                    }
                }
            }
        })
    ],
    controllers: [UsersController],
    providers: [UsersService]
})
export class UsersModule {}
