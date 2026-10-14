import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { RegiterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository:Repository<User>
    ){}

    async register(registerDto:RegiterDto){
      const existingUser = await this.userRepository.findOne({
        where:{email: registerDto.email}
      })
      if(existingUser){
        throw new ConflictException('Email already registered')
      }
      const hashedPassword = await bcrypt.hash(
        registerDto.password,
        10
      )
      const user = this.userRepository.create({
        name: registerDto.name,
        email: registerDto.email,
        password:hashedPassword
      })
      const savedUser = await this.userRepository.save(user);
      const { password, ...result}= savedUser;
      return {
        message:"User Registered Successfully !",
        user:result
      }
    }
}
