import { Profil } from "./profil";

export class User {
    id:number=0;
    userName:string='';
    userPassword:string='';
    email:string='';
   profils:Profil[]= [];
 isOnline: Boolean
}