import { SetMetadata } from "@nestjs/common";//metadata is shore on a class/mothod so later guards can read it 

export const ROLES_KEY='roles';//Creates a constant string 'roles' to be used as the metadata key.
//defines a custome decorator function called roles
//the decoratoer can take in any number of string args ie ADMIN or USER
// Attaches the array of roles to the route/class using the key 'roles'.
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);

//decorators add extra behavior or metadata to a class