import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './create-user.dto';
import { UpdateUserDto } from './update-user.dto';

@Controller('users')
export class UsersController {
    constructor( private readonly userService: UsersService){}

    @Post()
    create(@Body() createUserDto: CreateUserDto){
        return this.userService.create(createUserDto)
    }

    @Get()
    findAll(
        @Query('page') page:string = "1",
        @Query('limit') limit:string = '10'
    ){
        return this.userService.findAll(
            Number(page),
            Number(limit)
        )
    }

    @Get('search')
    findByEmail(@Query('email') email:string){
        return this.userService.findByEmail(email);
    }

    @Get(':id')
    findByID(@Param('id') id:string){
        return this.userService.findByID(id);
    }

    @Patch(':id')
    update(
        @Param('id') id:string,
        @Body() updateUserDto: UpdateUserDto
    ){
        return this.userService.update(id,updateUserDto);
    }

    @Delete(':id')
    remove(@Param('id') id:string){
        return this.userService.remove(id)
    }
}
