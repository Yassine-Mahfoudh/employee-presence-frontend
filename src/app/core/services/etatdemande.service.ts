import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Etatdemande } from '../models/etatdemande';

@Injectable({
  providedIn: 'root'
})
export class EtatdemandeService {


  getetatdemandebyid : string;
  getetatdemandeurl: string;

  constructor(private http:HttpClient) { 
    
    this.getetatdemandeurl= 'http://localhost:8080/etatdemande';
    this.getetatdemandebyid= 'http://localhost:8080/etatdemande/find';
  }


  getEtatDemandes():Observable<Etatdemande[]>
    {
      return this.http.get<Etatdemande[]>(this.getetatdemandeurl);  
     }
     getEtatDemandeByempId(id:any):Observable<Etatdemande>
    {
      return this.http.get<Etatdemande>(this.getetatdemandebyid+'/'+id); }


}
