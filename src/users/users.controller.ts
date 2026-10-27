import { Controller, Get } from '@nestjs/common';

@Controller('users')
export class UsersController {
    @Get()
    getUser(){
        return [
            {id:1,name:'Mohit',role:"Developer"},
            {id:2,name:'Rohit',role:"Developer"},
            {id:3,name:'Amit',role:"Designer"},
            {id:4,name:'Anil',role:"QA"},
        ]
    }
}
