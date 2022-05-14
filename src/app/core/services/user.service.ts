import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  PATH_API="http://localhost:8080"

  requestHeader= new HttpHeaders(
    {"No-Auth":"True"}
  )

  constructor(private httpclient: HttpClient,
    private authService:AuthService) { }

  public login(loginData){
    return this.httpclient.post(this.PATH_API+'/authenticate',loginData,{headers:this.requestHeader});
  }

  public roleMatch(allowedRoles) :boolean{
    let isMatch = false;
    const userRoles : any=this.authService.getRoles();
    if(userRoles) {
      for(let i = 0; i<userRoles.length; i++) {
        if(allowedRoles.indexOf(userRoles[i].name) !== -1){
         isMatch = true;
         break;
        }
      }
    }
    return isMatch;
    }

  public forgotPassword(email:any){
    return this.httpclient.post(this.PATH_API+'/utilisateur/forgotPassword',email,
    {headers:this.requestHeader});
  // {headers : new HttpHeaders().set('Content-Type',"application/json")});
  }

  public changePassword(data:any){
    return this.httpclient.post(this.PATH_API+'/utilisateur/changePassword',data)
    //,{headers : new HttpHeaders().set('Content-Type',"application/json")});
  }
  
}
