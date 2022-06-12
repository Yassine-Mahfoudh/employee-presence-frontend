import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Typedemande } from '../models/typedemande';

@Injectable({
  providedIn: 'root'
})
export class TypedemandeService {


  gettypedemandebyid : string;
  gettypedemandeurl: string;

  constructor(private http:HttpClient) { 
    
    this.gettypedemandeurl= 'http://localhost:8080/typedemande';
    this.gettypedemandebyid= 'http://localhost:8080/typedemande/find';
  }


  getTypeDemandes():Observable<Typedemande[]>
    {
      return this.http.get<Typedemande[]>(this.gettypedemandeurl);  
     }
     getTypeDemandeByempId(id:any):Observable<Typedemande>
    {
      return this.http.get<Typedemande>(this.gettypedemandebyid+'/'+id); }

}
