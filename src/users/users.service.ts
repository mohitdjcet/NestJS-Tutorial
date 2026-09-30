import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository:Repository<User>
    ){}

    async create(createUserDto:CreateUserDto){
        const user = this.userRepository.create(
            createUserDto,
        );
        return this.userRepository.save(user)
    }

    async findAll(){
        return this.userRepository.find()
    }

    async findOne(id:number){
        const user = await this.userRepository.findOneBy({
            id,
        });
        if(!user){
            throw new NotFoundException(
                "User ID notn found"
            )
        }
        return user;
    }

    async update(
        id:number,
        updateUserDto:UpdateUserDto
    ){
        const user = await this.userRepository.preload({
            id,
            ...updateUserDto
        })
        if(!user){
            throw new NotFoundException("User ID not found")
        }
        return this.userRepository.save(user)
    }

    async remove(id:number){
        const user = await this.findOne(id);
        await this.userRepository.remove(user);

        return{
            message:"User deleted Successfully"
        }
    }
}
