import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository:Repository<User>
    ){}

    async create(
        name:string,
        email:string,
        age:number
    ){
        const user = this.userRepository.create({
            name,
            email,
            age
        });
        return this.userRepository.save(user)
    }
}
