import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './create-user.dto';

@Controller('users')
export class UsersController {
    constructor( private readonly userService: UsersService){}

    @Post()
    create(@Body() createUserDto: CreateUserDto){
        return this.userService.create(createUserDto)
    }

    @Get()
    findAll(){
        return this.userService.findAll()
    }

    @Get('search')
    findByEmail(@Query('email') email:string){
        return this.userService.findByEmail(email);
    }

    @Get(':id')
    findByID(@Param('id') id:string){
        return this.userService.findByID(id);
    }
}
