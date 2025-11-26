import{Injectable} from '@nestjs/common';
import{PassportStrategy} from '@nestjs/passport';
import{ExtractJwt, Strategy} from 'passport-jwt';

//1.verify signature(with secret/public key)
//2.check expiration
//3.read claims to determine user or permission 

//parts
//a. header ->algorithum used and token type 
//b. playload->claims->data like sub,name, exp, role
//c. signature encrypted hash
@Injectable()
export class JwstStrategy extends PassportStrategy(Strategy){
    constructor(){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'jwt_secret',//It is used to verify the integrity and authenticity of the token. It must match the secret used when signing the token.

        });
    }



async validate(payload:any){
    return { id:payload.sub,
        email:payload.email, 
        role:payload.role};

}
}