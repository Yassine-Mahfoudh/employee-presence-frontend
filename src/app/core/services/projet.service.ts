import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Projet } from '../models/projet';


@Injectable({
  providedIn: 'root'
})
export class ProjetService {

  deleteprojecturl: string;
  addprojecturl : string;
  getprojecturl: string;
  updateprojecturl: string;
  

  constructor(private http:HttpClient) {
    this.deleteprojecturl= 'http://localhost:8080/projet/delete';
    this.getprojecturl= 'http://localhost:8080/projet';
    this.addprojecturl= 'http://localhost:8080/projet/add';
    this.updateprojecturl= 'http://localhost:8080/projet/update';
    
   }

   deleteProjet(projet : Projet):Observable<Projet>
    {
      return this.http.delete<Projet>(this.deleteprojecturl+'/'+projet.id);   
    }

   addProjet(projet : Projet):Observable<Projet>{
     return this.http.post<Projet>(this.addprojecturl,projet);
    }
    getProjets():Observable<Projet[]>
    {
      return this.http.get<Projet[]>(this.getprojecturl);   }

    updateProjet(projet : Projet):Observable<Projet>
    {
      return this.http.put<Projet>(this.updateprojecturl+'/'+projet.id,projet);   
    }

 
}
