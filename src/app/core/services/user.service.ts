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

  public roleMatch(allowedRoles) : boolean | undefined{
    let isMatch=false;
    const userRoles : any=this.authService.getRoles();

    if (userRoles !=null && userRoles)
    {
      for(let i=0;i<userRoles.length;i++)
      {
        for(let j=0;j<allowedRoles.length;j++)
        {
          if(userRoles[i].name === allowedRoles[j])
          {
            isMatch=true;
            return isMatch;
          }
          else
          {
            return isMatch;
          }
        }
      }
    }
    //throw new Error("Role not found")
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
