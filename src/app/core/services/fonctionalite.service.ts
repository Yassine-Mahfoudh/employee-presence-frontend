import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Fonctionalite } from '../models/fonctionalite';

@Injectable({
  providedIn: 'root'
})
export class FonctionaliteService {

  deletefonctionaliteurl: string;
  addfonctionaliteurl : string;
  getfonctionaliteurl: string;
  updatefonctionaliteurl: string;
  

  constructor(private http:HttpClient) {
    this.deletefonctionaliteurl= 'http://localhost:8080/fonctionalite/delete';
    this.getfonctionaliteurl= 'http://localhost:8080/fonctionalite';
    this.addfonctionaliteurl= 'http://localhost:8080/fonctionalite/add';
    this.updatefonctionaliteurl= 'http://localhost:8080/fonctionalite/update';
    
   }

   deleteFonctionalite(fonctionalite : Fonctionalite):Observable<Fonctionalite>
    {
      return this.http.delete<Fonctionalite>(this.deletefonctionaliteurl+'/'+fonctionalite.id);   
    }

   addFonctionalite(fonctionalite : Fonctionalite):Observable<Fonctionalite>{
     return this.http.post<Fonctionalite>(this.addfonctionaliteurl,fonctionalite);
    }
    getFonctionalites():Observable<Fonctionalite[]>
    {
      return this.http.get<Fonctionalite[]>(this.getfonctionaliteurl);   }

    updateFonctionalite(fonctionalite : Fonctionalite):Observable<Fonctionalite>
    {
      return this.http.put<Fonctionalite>(this.updatefonctionaliteurl,fonctionalite);   
    }

}
