
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Logaccess } from '../models/logaccess';


@Injectable({
  providedIn: 'root'
})
export class LogaccessService {
  getLogaccesseurl: string;

  constructor(private http:HttpClient) { 

    this.getLogaccesseurl= 'http://localhost:8080/logaccess';
  }

  getLogaccess():Observable<Logaccess[]>
  {
    return this.http.get<Logaccess[]>(this.getLogaccesseurl);  
  }
}
