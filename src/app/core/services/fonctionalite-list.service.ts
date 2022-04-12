import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Fonctionalite } from '../models/fonctionalite';

@Injectable({
  providedIn: 'root'
})
export class FonctionaliteListService {
  getfonctionaliteurl: string;
  constructor(private http:HttpClient) { 

    this.getfonctionaliteurl= 'http://localhost:8080/fonctionalite';
  }

  getFonctionalites():Observable<Fonctionalite[]>
  {
    return this.http.get<Fonctionalite[]>(this.getfonctionaliteurl);   }
}
