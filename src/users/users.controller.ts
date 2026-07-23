import { Controller, Get, Query } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private usersServices:UsersService){}

    @Get()
    getUsers(
        @Query('city') city:string,
        @Query('role') role:string
    ){
        return {
            city,
            role
        }
    }
}
