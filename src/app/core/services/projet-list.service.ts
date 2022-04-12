import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Projet } from '../models/projet';

@Injectable({
  providedIn: 'root'
})
export class ProjetListService {
  getprojecturl: string;

  constructor(private http:HttpClient) {
    this.getprojecturl= 'http://localhost:8080/projet';
   }
   getProjets():Observable<Projet[]>
    {
      return this.http.get<Projet[]>(this.getprojecturl);   }
}
