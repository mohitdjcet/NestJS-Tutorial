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

    updateUser(id: number, updateUser:any){
        const index = this.users.findIndex(user => user.id === id);

        if(index === -1){
            return{
                message: "User Not found"
            }
        }

        this.users[index]={
            id,
            ...updateUser,
        }

        return{
            message: "User Update Successfully",
            data: this.users[index],
        }
    }

    pathUser(id:number, updates:any){
        const user = this.users.find(user => user.id === id);

        if(!user){
            return{
                message:"User not found"
            }
        }
        Object.assign(user,updates);

        return{
            message:"User Updated Successfully",
            data:user
        }
    }
}
