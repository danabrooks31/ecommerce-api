import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
//every guard has the CanActivate, ExecutionContext gives up info abut the current request
import { Reflector } from "@nestjs/core";
//reflectors read metadata that decorators put in class methods
import { ROLES_KEY } from "../decorators/roles.decorator";
//the metadata key you used in the roles decorator

@Injectable()
export class RolesGuard implements CanActivate{
    //constructor that injects the reflector so that guard can read the @Roles Metadate
    constructor(private reflector: Reflector){}

    //the single method that guards must implment
    //returns true to allow request and false otherwise
    canActivate(context: ExecutionContext): boolean{
        //reads the role required on the route handler
        //context.getHandler() → gets the function (route handler) that’s currently being called.
        //this.reflector.get(...) → checks if that function has metadata under the key 'roles' (your ROLES_KEY).
        //Returns that metadata (e.g., ['ADMIN']) so you can check the user’s role against it.
        const requiredRoles=this.reflector.get<string[]>(ROLES_KEY, context.getHandler());
        //if no roles metadata is required, let though
        if(!requiredRoles) return true;
        //gets the underlying HTTP request and pulls out the user
        const { user } =context.switchToHttp().getRequest();
        //allows access only if the users role is one of the required roles, which is admin
        return requiredRoles.includes(user.role);
    }
        
}        
    
