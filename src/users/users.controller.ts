import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(
        private readonly usersService:UsersService
    ){}

    @Post()
    create(@Body() body:any){
        return this.usersService.create(
            body.name,
            body.email,
            body.age
        )
    }
}
