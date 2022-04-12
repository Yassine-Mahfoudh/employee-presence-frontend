import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../models/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeListService {
  getemployeeurl: string;
  constructor(private http:HttpClient) {

    this.getemployeeurl= 'http://localhost:8080/employee';
   
   }

   getEmployees():Observable<Employee[]>
    {
      return this.http.get<Employee[]>(this.getemployeeurl);   }
}
