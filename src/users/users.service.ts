import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
    private users = [
        {id:1,name:"Mohit",email:"mohit@gmail.com"},
        {id:2,name:"Rohit",email:"rohit@gmail.com"},
        {id:3,name:"Amit",email:"amit@gmail.com"},
    ];

    createUser(user:any){
        this.users.push(user);
        return{
            message:"User Created Successfully",
            data: user,
        }
    }

    getAllUser(){
        return this.users;
    }

    getUserById(id:number){
        return this.users.find(user => user.id === id);
    }
}
