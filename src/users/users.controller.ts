import { Body, Controller, Get, Post } from '@nestjs/common';
// import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    // constructor(private usersServices:UsersService){}

    @Post()
    createUser(@Body('name') name:string){
        return {
            name
            // email: body.email
        }
    }

    @Get()
    getUser(){
        return "All Users"
    }
}
