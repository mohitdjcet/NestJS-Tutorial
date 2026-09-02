import { Controller, Get, NotFoundException, Param, UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';
import { UsersService } from './users.service';
import { LoggingInterceptor } from 'src/logging/logging.interceptor';
@Controller('users')
// @UseInterceptors(LoggingInterceptor)
export class UsersController {
    constructor(private userService: UsersService){}

    @Get()
    getProfile(){
        return[
            {id:1, name:"Mohit"},
            {id:2, name:"Rohit"},
            {id:3, name:"Amit"}
        ]
    }
}
