import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Profil } from '../models/profil';

@Injectable({
  providedIn: 'root'
})
export class ProfilService {

  deleteprofilurl: string;
  addprofilurl : string;
  getprofilurl: string;
  updateprofilurl: string;
  

  constructor(private http:HttpClient) {
    this.deleteprofilurl= 'http://localhost:8080/profil/delete';
    this.getprofilurl= 'http://localhost:8080/profil';
    this.addprofilurl= 'http://localhost:8080/profil/add';
    this.updateprofilurl= 'http://localhost:8080/profil/update';
    
   }

   deleteProfil(profil : Profil):Observable<Profil>
    {
      return this.http.delete<Profil>(this.deleteprofilurl+'/'+profil.id);   
    }

   addProfil(profil : Profil):Observable<Profil>{
     return this.http.post<Profil>(this.addprofilurl,profil);
    }
    getProfils():Observable<Profil[]>
    {
      return this.http.get<Profil[]>(this.getprofilurl);   }

    updateProfil(profil : Profil):Observable<Profil>
    {
      return this.http.put<Profil>(this.updateprofilurl+'/'+profil.id,profil);   
    }

    
}
