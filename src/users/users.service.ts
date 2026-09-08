import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.schema';
import { CreateUserDto } from './create-user.dto';

@Injectable()
export class UsersService {
    constructor( 
        @InjectModel(User.name)
        private userModel: Model<User>
    ){}

    async create(createUserDto:CreateUserDto){
        return this.userModel.create(createUserDto)
    }

}
