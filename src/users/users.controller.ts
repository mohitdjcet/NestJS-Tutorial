import { Body, Controller, Post, UseGuards,Get, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { RegiterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/jwt-auth/roles.guard';
import { Roles } from 'src/auth/jwt-auth/roles.decorator';

type AuthenticatedRequest = Request & {
    user:{
        sub:number,
        email:string,
        iat:number,
        exp:number
    }
}

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

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Req() request: AuthenticatedRequest){
        return {
            message:"Authenticated request Successfully",
            user:{
                id: request.user.sub,
                email: request.user.email
            }
        }
    }

    @UseGuards(JwtAuthGuard)
    @Get('dashboard')
    getDash(@Req() request: AuthenticatedRequest){
        return{
            message:"Welcome to your Dashboard Page",
            userId: request.user.sub,
        }
    }

    @UseGuards(JwtAuthGuard,RolesGuard)
    @Roles('admin')
    @Get('adminuser')
    getAdminData(){
        return{
            message:"Welcome Admin",
            data:"Only Admin can access"
        }
    }
}
