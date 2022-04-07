import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Salle } from '../models/salle';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SalleService {
  
  urlApi='http://localhost:8080/salle';

  constructor(private http : HttpClient) { }

//CRUD
// Methode Get

getAll() : Observable<Salle[]>{
  return this.http.get<Salle[]>(this.urlApi);
}

//Methode Delete

delete(id : number){
  return this.http.delete(`${this.urlApi}/delete/${id}`)
}

//Methode Post

add(salles){
return this.http.post<Salle>(`${this.urlApi}/add`,salles)
}


public update(salle: Salle) {
  return this.http.put<Salle>(`${this.urlApi}/update`,salle);
}

getSalleById(id: number): Observable<Salle> {
  return this.http.get<Salle>(`${this.urlApi}/find/${id}`)
}
}
