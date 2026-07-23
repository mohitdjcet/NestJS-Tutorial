import { Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private usersServices:UsersService){}
    @Get(":userId/order/:orderId")
    getUser(
        @Param('userId') userId: string,
        @Param('orderId') orderId: string,
    ){
        // return this.usersServices.getUsers(id)
        // return `User ID: ${id}`
        return{
            userId,
            orderId
        }
    }
    // @Post()
    // @Put()
    // @Patch()
    // @Delete()
}
