import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor( private usersSerices: UsersService){}
    @Get()
    getUsers(){
        return this.usersSerices.getUsers()
    }
}
