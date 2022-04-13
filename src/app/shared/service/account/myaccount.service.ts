import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from 'src/app/core/models/employee';
import { AuthService } from 'src/app/core/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class MyaccountService {
  
  getEmpurl: string;

  constructor(private http:HttpClient) {

  this.getEmpurl= 'http://localhost:8080/utilisateur/find/emp'

}


getMyaccount(userName:String):Observable<Employee>
    {
      return this.http.get<Employee>(this.getEmpurl+'/'+userName)   }

}
