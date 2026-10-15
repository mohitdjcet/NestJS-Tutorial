import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { RegiterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Controller('users')
export class UsersController {
    constructor(
        private readonly usersService:UsersService
    ){}

    @Post('register')
    register(@Body() registerDto:RegiterDto){
        return this.usersService.register(registerDto)
    }

    @Post('login')
    login(@Body() loginDto:LoginDto){
        return this.usersService.login(loginDto)
    }
}
