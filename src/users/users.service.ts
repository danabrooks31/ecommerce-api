import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'; //inject database
import { Repository } from 'typeorm';//gives database methods
import { User } from './user.entity';//user entity
@Injectable()
export class UsersService {
    //constructor with repository injection
    //declare and initalize userReoo
    constructor(
        @InjectRepository(User)
        private userRepo: Repository<User>
    ){}

    //Partial<User> some types of user fields are required
    create(user: Partial<User>){
        //creates or updates a user in the database
            try {
                return this.userRepo.save(user);
            } catch (e: any) {
            // Postgres duplicate key constraint
            if (e?.code === '23505') {
                throw new ConflictException('Email already in use');
            }
      throw e;
            }    
    }



    findByEmail(email: string){
        return this.userRepo.findOne({where:{email}});

    }


}
