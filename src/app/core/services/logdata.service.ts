import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Logdata } from '../models/logdata';

@Injectable({
  providedIn: 'root'
})
export class LogdataService {

  getLogdataurl: string;

  constructor(private http:HttpClient) { 

    this.getLogdataurl= 'http://localhost:8080/logdata';
  }

  getLogdata():Observable<Logdata[]>
  {
    return this.http.get<Logdata[]>(this.getLogdataurl);  
  }
}
