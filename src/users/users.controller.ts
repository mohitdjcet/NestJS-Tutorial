import { Body, Controller, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private userService: UsersService){}

    @Post()
    createUser(@Body() body:any){
        return this.userService.createUser(body);
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
}
