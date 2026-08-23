import { Controller, Get, NotFoundException, Param, UseFilters } from '@nestjs/common';
import { UsersService } from './users.service';
import { HttpExceptionFilter } from 'src/common/filter/http-exception/http-exception.filter';
@Controller('users')
@UseFilters(HttpExceptionFilter)
export class UsersController {
    constructor(private userService: UsersService){}

    @Get(':id')
    getUser(@Param('id') id:string){
        throw new NotFoundException(
            'User not Found'
        )
    }
}
