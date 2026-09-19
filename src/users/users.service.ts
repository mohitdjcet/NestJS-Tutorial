import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.schema';
import { CreateUserDto } from './create-user.dto';
import { error } from 'console';
import { UpdateUserDto } from './update-user.dto';

@Injectable()
export class UsersService {
    constructor( 
        @InjectModel(User.name)
        private userModel: Model<User>
    ){}

    async create(createUserDto:CreateUserDto){
        return this.userModel.create(createUserDto)
    }

    async findAll(
        sortBy:string = 'createdAt',
        name:string = 'desc'
    ){
        const sortName = name === 'asc'? 1 : -1
        return this.userModel.find().sort({ [sortBy]: sortName})
    }

    async findByEmail(email:string){
        return this.userModel.findOne({ email })
    }

    async findByID(id:string){
        // return this.userModel.findById(id)
        const user = this.userModel.findById(id);

        if(!user){
            throw new NotFoundException("User not found")
        }
        return user;
    }

    async update(
        id:string,
        updateUserDto: UpdateUserDto
    ){
        return this.userModel.findByIdAndUpdate(
            id,
            updateUserDto,
            {new : true}
        )
    }

    async remove(id:string){
        // return this.userModel.findByIdAndDelete(id)
        const user = await this.userModel.findByIdAndDelete(id)

        if(!user){
            throw new NotFoundException("User not found")
        }
        return {
            message:"User Deleted Successfully",
            data:user
        }
    }
}
