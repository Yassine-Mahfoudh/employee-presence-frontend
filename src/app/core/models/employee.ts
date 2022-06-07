import { Profil } from "./profil";

export class Employee {
    id:number=0;
    lastname:string='';
    firstname:string='';
    role:string='';
    birthdate:string='';
    address:string='';
    phonenumber:string='';
    photo:string='';
    salle:string='';
    project:string='';
    manager:string='';
    managerid:number=0;
    listeProfils:String[]=[];
    gender:string='';
}