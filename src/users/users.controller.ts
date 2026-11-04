import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
    constructor(
        private userServices:UsersService
    ){}

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    async getProfile(@Request() req:any){
        const user = await this.userServices.findById(req.user.sub)
        return{
            message:"Profile Fetched Successfully",
            user,
        }
    }
}
