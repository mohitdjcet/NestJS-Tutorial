import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
    @Get()
    @ApiOperation({summary:"Get all users details"})
    @ApiResponse({ status:200, description:"User Fetched Successfully !"})
    getUser(){
        return [
            {id:1,name:'Mohit',role:"Developer"},
            {id:2,name:'Rohit',role:"Developer"},
            {id:3,name:'Amit',role:"Designer"},
            {id:4,name:'Anil',role:"QA"},
        ]
    }


    @Post()
    @ApiOperation({summary:"Crate a new User"})
    @ApiResponse({ status:201, description:"User Craeted Successfully !"})
    createUser(@Body() createUserDto:CreateUserDto){
        return{
            id:3,
            ...createUserDto,
        }
    }
}
