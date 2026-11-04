import { Injectable } from '@nestjs/common';
import { User } from './schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name)
        private userModule:Model<User>,
    ){}

    async findByEmail(email:string){
        return this.userModule.findOne({
            email:email.toLowerCase(),
        })
    }

    async create(userData:Partial<User>){
        const user = new this.userModule(userData);
        return user.save();
    }

    async findById(id:string){
        return this.userModule.findById(id).select('-password');
    }
}
