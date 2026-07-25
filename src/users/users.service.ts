import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
    private users: any[] = [];

    createUser(user:any){
        this.users.push(user);

        return{
            message:"User Created Successfully",
            data: user,
        }
    }
}
