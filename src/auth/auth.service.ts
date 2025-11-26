import { Injectable, UnauthorizedException } from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
import {UsersService} from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import {RegisterDto} from './dto/register.dto'
import {LoginDto} from './dto/login.dto'
import {User} from 'src/users/user.entity'


//business logic 
@Injectable()
export class AuthService { //info for registering and logging users
    //this constructor injects usersServices(used to interact with user entity), 
    // jwtService, used to generate jwts for login
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ){}

    //handles user reg, takes in RegisterDTO opject({email, password, role})
    //returns a Promise<User> which is an object that represents an ascyronous result
    async register(dto: RegisterDto):Promise<User>{
        //Hashes the password using bcrypt with a salt round of 10
        const hashed=await bcrypt.hash(dto.password,10);
        //calls create to user 
        const user=await this.usersService.create({...dto, password:hashed});
        return user;

    }

    async login(dto:LoginDto){
        //finds user in database by email
        const user =await this.usersService.findByEmail(dto.email);
        //if user is not found or password does not match hashed one, throw error
        if(!user||!(await bcrypt.compare(dto.password,user.password))){
            throw new UnauthorizedException('Invalid credentials');
        }
        //creates payload for jwt token 
        const payload={sub: user.id, email:user.email, role:user.role};
       //returns signed jwt token
        return {
            access_token:this.jwtService.sign(payload)
        };
    }

}

//async -makes a function that returns a promise that will eventually reso,lve to a funciton type
//await-waits for the promis to finish, pauses the function until the promise finishes
