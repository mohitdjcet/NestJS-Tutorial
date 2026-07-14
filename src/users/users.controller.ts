import { Controller, Get } from '@nestjs/common';

@Controller('users')
export class UsersController {
    @Get()
    getUsers(){
        return{
            success:true,
            message:"User Found"
        }
    }
    @Get('profile')
    getProfile(){
        return "User Profile"
    }
}
