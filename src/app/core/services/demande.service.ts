import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Demande } from '../models/demande';

@Injectable({
  providedIn: 'root'
})
export class DemandeService {

  
  deletedemandeurl: string;
  adddemandeurl : string;
  getdemandeurl: string;
  updatedemandeurl: string;
  

  constructor(private http:HttpClient) {
    this.deletedemandeurl= 'http://localhost:8080/demande/delete';
    this.getdemandeurl= 'http://localhost:8080/demande';
    this.adddemandeurl= 'http://localhost:8080/demande/add';
    this.updatedemandeurl= 'http://localhost:8080/demande/update';
    
   }

   deleteDemande(demande : Demande):Observable<Demande>
    {
      return this.http.delete<Demande>(this.deletedemandeurl+'/'+demande.id);   
    }

   addDemande(demande : Demande):Observable<Demande>{
     return this.http.post<Demande>(this.adddemandeurl,demande);
    }
    getDemandes():Observable<Demande[]>
    {
      return this.http.get<Demande[]>(this.getdemandeurl);   }

    updateDemande(demande : Demande):Observable<Demande>
    {
      return this.http.put<Demande>(this.updatedemandeurl+'/'+demande.id,demande);   
    }

}
