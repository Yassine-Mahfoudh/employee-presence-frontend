import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Users } from '../models/users';

@Injectable({
  providedIn: 'root'
})
export class UsersListService {
  getUsersurl: string;
  constructor(private http:HttpClient) { 
    this.getUsersurl= 'http://localhost:8080/utilisateur';
  }
  getUsers():Observable<Users[]>
  {
    return this.http.get<Users[]>(this.getUsersurl);   }

}
