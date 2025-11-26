import{IsEmail, IsNotEmpty} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto{
    //{} bc passed as a object literal
    @ApiProperty({example: 'user@example.com'})
    @IsEmail()
    email:string;

    @ApiProperty({example: 'P@ssw0rd!'})
    @IsNotEmpty()
    password: string;
}