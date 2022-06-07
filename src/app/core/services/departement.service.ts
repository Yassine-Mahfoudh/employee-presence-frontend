import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Departement } from '../models/departement';


@Injectable({
  providedIn: 'root'
})
export class DepartementService {

  deletedepartementurl: string;
  adddepartementurl : string;
  getdepartementurl: string;
  updatedepartementurl: string;
  

  constructor(private http:HttpClient) {
    this.deletedepartementurl= 'http://localhost:8080/departement/delete';
    this.getdepartementurl= 'http://localhost:8080/departement';
    this.adddepartementurl= 'http://localhost:8080/departement/add';
    this.updatedepartementurl= 'http://localhost:8080/departement/update';
    
   }

   deleteDepartement(departement : Departement):Observable<Departement>
    {
      return this.http.delete<Departement>(this.deletedepartementurl+'/'+departement.id);   
    }

   addDepartement(departement : Departement):Observable<Departement>{
     return this.http.post<Departement>(this.adddepartementurl,departement);
    }
    getDepartements():Observable<Departement[]>
    {
      return this.http.get<Departement[]>(this.getdepartementurl);   }

    updateDepartement(departement : Departement):Observable<Departement>
    {
      return this.http.put<Departement>(this.updatedepartementurl+'/'+departement.id,departement);   
    }
   /* getDepartementByName(name: string): Departement {
      return this.http.get<Departement>(this.getdepartementurl+ '/find/name/' + name);
    }*/
    getDepartementByName(name : any):Observable<Departement>
    {
      return this.http.get<Departement>(this.getdepartementurl+ '/find/name/' + name);
    }  
    getDepartementById(id : any):Observable<Departement>
    {
      return this.http.get<Departement>(this.getdepartementurl+ '/find/' + id);
    }  

}