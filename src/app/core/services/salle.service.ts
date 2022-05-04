import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Salle } from '../models/salle';

@Injectable({
  providedIn: 'root'
})
export class SalleService {

  deleteSalleurl: string;
  addSalleurl : string;
  getSalleurl: string;
  updateSalleurl: string;

  constructor(private http:HttpClient) { 

    this.deleteSalleurl= 'http://localhost:8080/salle/delete';
    this.getSalleurl= 'http://localhost:8080/salle';
    this.addSalleurl= 'http://localhost:8080/salle/add';
    this.updateSalleurl= 'http://localhost:8080/salle/update';
  }

  deleteSalle(salle : Salle):Observable<Salle>
    {
      return this.http.delete<Salle>(this.deleteSalleurl+'/'+salle.id);   
    }

   addSalle(salle : Salle):Observable<Salle>{
     return this.http.post<Salle>(this.addSalleurl,salle);
    }
    getSalles():Observable<Salle[]>
    {
      return this.http.get<Salle[]>(this.getSalleurl);   }

    updateSalle(salle : Salle):Observable<Salle>
    {
      return this.http.put<Salle>(this.updateSalleurl+'/'+salle.id,salle);   
    }

}
