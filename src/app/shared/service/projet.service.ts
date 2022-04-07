import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CONSTANTE_URL } from '../constant/url/constant.url';
import { Projet } from '../models/projet';

@Injectable({
  providedIn: 'root'
})
export class ProjetService {

  constructor(private http : HttpClient) { }

  //CRUD
  // Methode Get
  
  getAllProjects() : Observable<Projet[]>{
    return this.http.get<Projet[]>(`${CONSTANTE_URL.PROJECTS}`);
  }
  
  //Methode Delete
  
  deletePproject(id : number){
    return this.http.delete(`${CONSTANTE_URL.DELETE_PROJECT}/${id}`)
  }
  
  //Methode Post
  
  addProject(project : Projet){
  return this.http.post<Projet>(`${CONSTANTE_URL.DELETE_PROJECT}`,project)
  }
  
  
  public updateProject(project: Projet) {
    return this.http.put<Projet>(`${CONSTANTE_URL.ADD_PROJECT}`,project);
  }
  
  getProjectById(id: number): Observable<Projet> {
    return this.http.get<Projet>(`${CONSTANTE_URL.PROJECT}/${id}`)
  }
}
