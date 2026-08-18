import { BadRequestException, Body, ConflictException, Controller, ForbiddenException, Get, HttpException, InternalServerErrorException, NotFoundException, Param, Post, UnauthorizedException } from '@nestjs/common';
import { UsersService } from './users.service';
@Controller('users')
export class UsersController {
    constructor(private userService: UsersService){}

    // @Get('test')
    // testExcep(){
    //     throw new HttpException(
    //         "Something went wrong",
    //         400
    //     )
    // }

    // @Get(':id')
    // getUser(@Param('id') id:string){
    //     if(isNaN(Number(id))){
    //         throw new BadRequestException(
    //             "User ID must be a Number"
    //         );
    //     }
    //     return{
    //         id,
    //         message: "Valid user Id"
    //     }
    // }


    // @Get('profile')
    // getProfile(){
    //     const isAuth = false;

    //     if(!isAuth){
    //         throw new UnauthorizedException(
    //             "Please login first"
    //         )
    //     }
    //     return{
    //         message:"Profile Data"
    //     }
    // }

    // @Get('admin')
    // getAdminData(){
    //     const isAdmin = false;

    //     if(!isAdmin){
    //         throw new ForbiddenException(
    //             "You do not have admin access"
    //         )
    //     }
    //     return{
    //         message:"Admin Data"
    //     }
    // }

    // @Get(':id')
    // getUser(@Param('id') id:string){
    //     const user = null;

    //     if(!user){
    //         throw new NotFoundException(
    //             "User Not found"
    //         )
    //     }
    //     return user;
    // }

    @Post()
    creteUser(@Body() body:any){
        const existingUser = true;

        if(existingUser){
            throw new ConflictException(
                'Email is alredy Exists'
            )
        }
        return {
            messahe:"User creted Successfully"
        }
    }

    @Get('server-error')
    getServerErr(){
        throw new InternalServerErrorException(
            "Something went wrong"
        )
    }
}
