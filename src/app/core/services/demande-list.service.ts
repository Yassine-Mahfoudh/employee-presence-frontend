import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Demande } from '../models/demande';

@Injectable({
  providedIn: 'root'
})
export class DemandeListService {
  getdemandeurl: string;
  constructor(private http:HttpClient) {

    this.getdemandeurl= 'http://localhost:8080/demande';

   }

   getDemandes():Observable<Demande[]>
    {
      return this.http.get<Demande[]>(this.getdemandeurl);   }
      
}
