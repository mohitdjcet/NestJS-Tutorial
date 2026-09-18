import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.schema';
import { CreateUserDto } from './create-user.dto';
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

    async findAll(page:number,limit:number){
        const skip = (page-1)*limit;
        const [users,total] = await Promise.all([
            this.userModel.find().skip(skip).limit(limit),
            this.userModel.countDocuments()
        ])
        const totalPages = Math.ceil(total/limit);
        return {
            data:users,
            pagination:{
                total,
                page,
                limit,
                totalPages
            }
        }
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
