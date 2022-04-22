import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../models/employee';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  
  deleteemployeeurl: string;
  addemployeeurl : string;
  getemployeeurl: string;
  updateemployeeurl: string;
  

  constructor(private http:HttpClient) {
    this.deleteemployeeurl= 'http://localhost:8080/employee/delete';
    this.getemployeeurl= 'http://localhost:8080/employee';
    this.addemployeeurl= 'http://localhost:8080/employee/add';
    this.updateemployeeurl= 'http://localhost:8080/employee/update';
    
   }

   deleteEmployee(employee : Employee):Observable<Employee>
    {
      return this.http.delete<Employee>(this.deleteemployeeurl+'/'+employee.id);   
    }

   addEmployee(employee : Employee):Observable<Employee>{
     return this.http.post<Employee>(this.addemployeeurl,employee);
    }
    getEmployees():Observable<Employee[]>
    {
      return this.http.get<Employee[]>(this.getemployeeurl);   }

    updateEmployee(employee : Employee):Observable<Employee>
    {
      return this.http.put<Employee>(this.updateemployeeurl+'/'+employee.id,employee);   
    }
}
