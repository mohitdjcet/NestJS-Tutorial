import { Body, Controller, Get, HttpCode, Post, Res } from '@nestjs/common';
// import { UsersService } from './users.service';
import type { Response } from 'express';
@Controller('users')
export class UsersController {
    // constructor(private usersServices:UsersService){}

    // @Get()
    // getUser(){
    //     return ["Mohit","Rohit"]
    // }

    // @Post()
    // @HttpCode(200)
    // createUser(@Body('name') name:string){
    //     return {
    //         "success":true,
    //         "message":"User Created Successfully",
    //         "data":{
    //             name
    //             // email
    //         }
    //     }
    // }

    @Get()
    getUser(@Res() res: Response){
        res.status(200).json({
            sucess:true,
            message:"User Found"
        })
    }
}
