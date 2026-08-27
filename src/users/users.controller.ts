import { Controller, Get, NotFoundException, Param, UseFilters, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from 'src/auth/auth.guard';
@Controller('users')
@UseGuards(AuthGuard)
export class UsersController {
    constructor(private userService: UsersService){}

    @Get('profile')
    getProfile(){
        return{
            message:"Welcome to profile"
        }
    }
}
