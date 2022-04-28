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
  getemployeebyidurl:string;
  

  constructor(private http:HttpClient) {
    this.deleteemployeeurl= 'http://localhost:8080/employee/delete';
    this.getemployeeurl= 'http://localhost:8080/employee';
    this.getemployeebyidurl= 'http://localhost:8080/employee/find';
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
      return this.http.get<Employee[]>(this.getemployeeurl);   
    }
   /* getEmployeeById(id : any):Observable<Employee>
    {
      return this.http.get<Employee>(`${this.getemployeebyidurl}/${id}`);
    }  */
    /*getEmployeeByCode(code : any):Observable<Employee>
    {
      return this.http.get<Employee>(this.getemployeeurl+'/find'+'/'+code);
    }  
*/
getEmployeeById(id: number) {
  return this.http.get<Employee>(this.getemployeebyidurl + '/' + id);
}
    updateEmployee(employee : Employee, id :any):Observable<Employee>
    {
      return this.http.put<Employee>(this.updateemployeeurl+'/'+id,employee);   
    }
}
