import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Salle } from '../models/salle';

@Injectable({
  providedIn: 'root'
})
export class SalleListService {


  getSalleurl: string;
  
  constructor(private http:HttpClient) { 
    this.getSalleurl= 'http://localhost:8080/salle';

  }

  getSalle():Observable<Salle[]>
  {
    return this.http.get<Salle[]>(this.getSalleurl);   }
    
}
