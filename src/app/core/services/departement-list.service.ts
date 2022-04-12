import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Departement } from '../models/departement';

@Injectable({
  providedIn: 'root'
})
export class DepartementListService {
  getdepartementurl: string;
  constructor(private http:HttpClient) {
    this.getdepartementurl= 'http://localhost:8080/departement';
   }

  getDepartements():Observable<Departement[]>
    {
      return this.http.get<Departement[]>(this.getdepartementurl);   }

    
}
