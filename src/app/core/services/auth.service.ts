import { Injectable } from '@angular/core';
import { Employee } from '../models/employee';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor() { }


  public setRoles(roles: []) {
    /* This is storing the roles in local storage. */
    localStorage.setItem('roles', JSON.stringify(roles));
  }
  public getRoles(): [] {
    return JSON.parse(localStorage.getItem('roles')|| 'null' || '{}');
  }

  public setToken(jwtToken: string) {
    localStorage.setItem('jwtToken', jwtToken);
  }
  public getToken(): string {
    return localStorage.getItem('jwtToken')||'null'||'{}';
  }

  public getUsername(): string {
    return localStorage.getItem('userName')||'null'||'{}';
  }

  public setUsername(userName: string) {
    localStorage.setItem('userName', userName);
  }

  public setUser(utilisateur: User) {
    /* This is storing the user in local storage. */
    localStorage.setItem('utilisateur', JSON.stringify(utilisateur));
  }
  public getUser(): User {
    return JSON.parse(localStorage.getItem('utilisateur')|| 'null' || '{}');
  }


  public setUserEmployee(employee: Employee) {
    /* This is storing the emloyee in local storage. */
    localStorage.setItem('employee', JSON.stringify(employee));
  }
  public getUserEmployee(): Employee {
    return JSON.parse(localStorage.getItem('employee')|| 'null' || '{}');
  }



  
  public clear() {
    localStorage.clear();
  }

  public isLoggedIn() {
    return this.getRoles() && this.getToken();
  }
  
  
}