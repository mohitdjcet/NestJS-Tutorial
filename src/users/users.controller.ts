import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
    constructor(private userService: UsersService){}

    @Post()
    createUser(@Body() createUserDto:CreateUserDto){
        return this.userService.createUser(createUserDto);
    }

    @Get()
    getUsers(){
        return this.userService.getAllUser();
    }

    @Get(":id")
    getUserById(@Param('id') id:string){
        return this.userService.getUserById(Number(id))
    }

    @Put(':id')
    updateUser(
        @Param('id') id:string,
        @Body() body:any
    ){
        return this.userService.updateUser(Number(id),body);
    }

    @Patch(':id')
    pathUser(
        @Param('id') id:string,
        @Body() body:any
    ){
        return this.userService.pathUser(Number(id),body);
    }

    @Delete(':id')
    deleteUser(@Param('id') id:string){
        return this.userService.deleteUser(Number(id));
    }
}
