import { Body, Controller,DefaultValuePipe,Get,Param,ParseBoolPipe,ParseFloatPipe,ParseIntPipe,ParseUUIDPipe,Post, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
    constructor(private userService: UsersService){}

    @Post()
    createUser(@Body() createUserDto:CreateUserDto){
        return this.userService.createUser(createUserDto);
    }

    // @Get(':id')
    // getUser(
    //     @Param('id',ParseIntPipe) id:number
    // ){
    //     return{
    //         id,
    //         type: typeof id
    //     }
    // }

    @Get('price/:price')
    getPrice(
        @Param('price',ParseFloatPipe) price:number
    ){
        return{
            price,
            type: typeof price
        }
    }

    @Get('active/:active')
    getActive(
        @Param('active',ParseBoolPipe) active:boolean
    ){
        return{
            active,
            type: typeof active
        }
    }

    @Get()
    getUser(
        @Query(
            "limit",
            new DefaultValuePipe(10),
            ParseIntPipe
        )
        limit: number
    ){
        return{
            limit
        }
    }
}
