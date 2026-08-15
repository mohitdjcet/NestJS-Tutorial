import { Body, Controller,Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
    constructor(private userService: UsersService){}

    @Post()
    createUser(@Body() createUserDto:CreateUserDto){
        return this.userService.createUser(createUserDto);
    }
}
