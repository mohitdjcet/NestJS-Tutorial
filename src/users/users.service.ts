import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
    private users=[
       "Mohit","Rohit","Amit" 
    ]
    getUsers(){
        return this.users;
    }
    getTotalUser(){
        return this.users.length;
    }
}
