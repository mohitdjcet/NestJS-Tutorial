import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { RegiterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository:Repository<User>,
        private readonly jwtService:JwtService
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

    async login(loginDto:LoginDto){
      const user = await this.userRepository.createQueryBuilder('user')
        .addSelect('user.password')
        .where('user.email = :email',{
          email:loginDto.email
        }).getOne()
      if(!user){
        throw new UnauthorizedException(
          "Invalid Email or Passsword"
        );
      }
      const isPasswordValid = await bcrypt.compare(
        loginDto.password,
        user.password
      )
      if(!isPasswordValid){
        throw new UnauthorizedException(
          'Invalid Email or Password'
        )
      }
      const paylod = {
        sub:user.id,
        email:user.email,
        role:user.role
      }
      const accessToken = await this.jwtService.signAsync(paylod)
      return{
        message:"Login Successful",
        access_token: accessToken,
        user:{
          id:user.id,
          name:user.name,
          email:user.email,
          role:user.role
        }
      }
    }
}
