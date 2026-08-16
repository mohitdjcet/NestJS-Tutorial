import { Controller, Get, Param, Query} from '@nestjs/common';
import { UsersService } from './users.service';
import { UppercasePipe } from 'src/uppercase/uppercase.pipe';
import { AgePipe } from 'src/age/age.pipe';
import { TrimPipe } from 'src/trim/trim.pipe';

@Controller('users')
export class UsersController {
    constructor(private userService: UsersService){}

    // @Get(':name')
    // getUser(
    //     @Param('name',UppercasePipe) name:string
    // ){
    //     return{
    //         name
    //     }
    // }

    // @Get('age/:age')
    // getAge(
    //     @Param('age',AgePipe) age:number
    // ){
    //     return{
    //         age
    //     }
    // }

    @Get()
    getUser(
        @Query('search',TrimPipe) search:string
    ){
        return{
            search
        }
    }
}
