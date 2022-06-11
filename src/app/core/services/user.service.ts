import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Profil } from '../models/profil';
import { User } from '../models/user';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  deleteUsersurl: string;
  addUsersurl : string;
  getUsersurl: string;
  updateUserslurl: string;
  getUserByUsernameURL:string;

  PATH_API="http://localhost:8080"

  requestHeader= new HttpHeaders(
    {"No-Auth":"True"}
  )





  requestHeader2= new HttpHeaders(
    {'Content-Type': 'application/json'}
      )




  constructor(private httpclient: HttpClient,
    private authService:AuthService) {

      this.deleteUsersurl= 'http://localhost:8080/utilisateur/delete';
      this.getUsersurl= 'http://localhost:8080/utilisateur';
      this.getUserByUsernameURL= 'http://localhost:8080/utilisateur/find/name';
      this.addUsersurl= 'http://localhost:8080/utilisateur/add';
      this.updateUserslurl= 'http://localhost:8080/utilisateur/update';

     }

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


  deleteUser(user : User):Observable<User>
    {
      return this.httpclient.delete<User>(this.deleteUsersurl+'/'+user.id);   
    }

    getUserProfils(id):Observable<Profil[]>
    {
      return this.httpclient.get<Profil[]>(this.getUsersurl+'/find/profils/'+id);   }

   addUser(user : User):Observable<User>{
     return this.httpclient.post<User>(this.addUsersurl,user,{headers:this.requestHeader2});
    }
    getUsers():Observable<User[]>
    {
      return this.httpclient.get<User[]>(this.getUsersurl);   }

    updateUser(user : User):Observable<User>
    {
      return this.httpclient.put<User>(this.updateUserslurl+'/'+user.id,user);   
    }

    getUserByUsername(username: String):Observable<User> {
      return this.httpclient.get<User>(this.getUserByUsernameURL + '/' + username);
    }

    getUserById(id:any):Observable<User>
    {
      return this.httpclient.get<User>(this.getUsersurl+'/find/'+id);  
    }


    getUserName(name : string){
      return this.httpclient
      .get<any>(this.getUserByUsernameURL+"/"+name)
     
  // return this.httpclient.get(getUserByUsernameURL)
    }
  
}
