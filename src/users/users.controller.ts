import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private userService: UsersService){}

    @Post()
    createUser(@Body() body:any){
        return this.userService.createUser(body);
    }
}
