import { Controller, Get, NotFoundException, Param, UseFilters } from '@nestjs/common';
import { UsersService } from './users.service';
@Controller('users')
export class UsersController {
    constructor(private userService: UsersService){}

    @Get(':id')
    getUser(@Param('id') id:string){
        throw new NotFoundException(
            'User not Found'
        )
    }
}
