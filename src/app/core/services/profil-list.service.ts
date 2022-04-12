import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Profil } from '../models/profil';

@Injectable({
  providedIn: 'root'
})
export class ProfilListService {
  getprofilurl: string;
 
  constructor(private http:HttpClient) {
   
    this.getprofilurl= 'http://localhost:8080/profil';
  
   }

  
    getlistProfils():Observable<Profil[]>
    { return this.http.get<Profil[]>(this.getprofilurl);   }


}
