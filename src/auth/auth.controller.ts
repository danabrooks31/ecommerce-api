import { Body, Controller, Post } from '@nestjs/common';
import {AuthService} from './auth.service'; //contains the logic for resitration and login
import {RegisterDto} from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ApiTags, ApiOperation, ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';

@ApiTags('Auth')//group endpoints in swagger under a header
@Controller('auth')//handles all routes that start with auth,
// /auth/register and /auth/login
export class AuthController {
    //constructor with dependancy injection
    //automatically assign the injected dependacy to this property
    constructor(private authService: AuthService){}
    
    //registers endpoints
    //@body extracts the body of the incoming JSON payload request

    //map to POST/auth/register
    @Post('register')
    @ApiOperation({summary:'Register a new user'})//describes what a single endpoint does
    @ApiCreatedResponse({description:'User registered'})//generates a 201 create response
    //but
    register(@Body() dto: RegisterDto){
        //pass DTO to create new user
        return this.authService.register(dto);
    }

    @Post('login')
    //method name inside of controller
    //casts body at dto
    @ApiOperation({summary:'Login and recieve JWT'})
    @ApiOkResponse({description: 'JWT access token returned'})//request is successful
    login(@Body() dto: LoginDto){
        return this.authService.login(dto);
    }



}
