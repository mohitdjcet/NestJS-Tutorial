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

    async findAll(name?:string,email?:string,minAge?:number,maxAge?:number,page:number=1,limit:number=10){
        const filter : any = {};
        if(name){
            filter.name=name
        }
        if(email){
            filter.email=email
        }
        if(minAge || maxAge ){
            filter.age = {};
            if(minAge){
                filter.age.$gte = minAge
            }
            if(maxAge){
                filter.age.$lte = maxAge
            }
        }
        const skip = (page -1)*limit;
        return this.userModel.find(filter).skip(skip).limit(limit);
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
