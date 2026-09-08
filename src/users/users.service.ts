import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.schema';

@Injectable()
export class UsersService {
    constructor( 
        @InjectModel(User.name)
        private userModel: Model<User>
    ){}

    // async createUser(){
    //     return this.userModel.create({
    //         name:"Mohit",
    //         email:"mohit@gmail.com",
    //         age:25,
    //         password:"12345"
    //     })
    // }
}
