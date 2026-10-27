import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto{
    @ApiProperty({
        example:"Amit",
        description:"User Name"
    })
    name!:string;

    @ApiProperty({
        example:"amit@example.com",
        description:"User Email ID"
    })
    email!:string;
}