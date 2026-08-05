import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
    private users = [
        {id:1,name:"Mohit",email:"mohit@gmail.com"},
        {id:2,name:"Rohit",email:"rohit@gmail.com"},
        {id:3,name:"Amit",email:"amit@gmail.com"},
    ];

    createUser(createUserDto:CreateUserDto){
        const newUser = {
            id:this.users.length+1,
            ...createUserDto
        }
        this.users.push(newUser);
        return{
            message:"User Created Successfully",
            data: newUser,
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

    deleteUser(id:number){
        const index = this.users.findIndex(user => user.id === id);

        if(index === -1){
            return{
                success:false,
                message:"User Not Found"
            }
        }

        const deleteUser = this.users[index];
        this.users.splice(index,1);
        return{
            success:true,
            message:"User Deleted",
            data: deleteUser,
        }
    }
}
