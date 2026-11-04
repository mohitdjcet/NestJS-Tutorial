import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Module({
  imports:[
    MongooseModule.forFeature([
      {
        name:User.name,
        schema:UserSchema
      }
    ])
  ],
  providers: [UsersService,JwtAuthGuard],
  controllers: [UsersController],
  exports:[UsersService]
})
export class UsersModule {}
