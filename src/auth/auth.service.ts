import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(registerDto:RegisterDto){
    const { name, email, password }= registerDto;
    const existingUser = await this.usersService.findByEmail(email);
    if(existingUser){
        throw new ConflictException('Email already registred')
    }
    const hashedPassword = await bcrypt.hash(password,10);
    const user = await this.usersService.create({
        name,
        email,
        password:hashedPassword,
        role:"USER"
    });
    return {
        message:"User Register Successfully",
        user:{
            id:user._id,
            name:user.name,
            email:user.email,
            role:user.role
        }
    }
  }

  async login(loginDto:LoginDto){
    const { email, password}= loginDto;
    const user = await this.usersService.findByEmail(email);
    if(!user){
        throw new UnauthorizedException("Invalid Email or password")
    }
    const isPasswordValid = await bcrypt.compare(
        password,
        user.password
    )
    if(!isPasswordValid){
        throw new UnauthorizedException("Invalid Email or password")
    }
    const payload = {
        sub: user._id.toString(),
        email:user.email,
        role:user.role,
    }
    const accessToken = await this.jwtService.signAsync(payload);

    return {
        message:"Login Successful",
        access_token: accessToken,
        user:{
            id:user._id,
            name:user.name,
            email:user.email,
            role:user.role
        }
    }
  }
}
