import { IsEmail, IsNotEmpty, IsOptional, IsEnum } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import{UserRole} from 'src/users/user.entity';

//1)defines what data should look like in an API Request
//2)validates the data 

export class RegisterDto{
    @ApiProperty({example: 'user@example.com'})
    @IsEmail()
    email: string;

    @ApiProperty({minLength:6, example: 'P@ssw0rd!'})
    @IsNotEmpty()
    password: string;

    @ApiPropertyOptional({enum:UserRole, example: UserRole.CUSTOMER})
    @IsOptional()
    @IsEnum(UserRole)
    role?:UserRole;//optional, admin, customer, or undefined
}