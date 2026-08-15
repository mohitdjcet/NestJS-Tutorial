import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
    createUser(createUserDto:CreateUserDto){
        return{
            message:"User Created Successfully",
            data: createUserDto,
        }
    }

}
