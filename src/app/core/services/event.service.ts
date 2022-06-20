import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MyEvent } from '../models/myevent';

export class StatEvent{
  event_start:string;
        event_end: string;
    id_salle: number;
        dep_id: number;
        event_title:string;
}
@Injectable({
  providedIn: 'root'
})
export class EventService {

  getEventsurl: string;
  getEventByTitleurl: string;
  getEventByIdurl: string;
  addEventsurl: string;
  deleteEventsurl: string;
  updateEventsurl: string;
  getStatEventsurl: string;


  constructor(private http:HttpClient) { 

    this.getEventsurl= 'http://localhost:8080/events';
    this.getEventByTitleurl='http://localhost:8080/events/find/title'
    this.getEventByIdurl='http://localhost:8080/events/find'
    this.addEventsurl= 'http://localhost:8080/events/add';
    this.deleteEventsurl= 'http://localhost:8080/events/delete';
    this.updateEventsurl= 'http://localhost:8080/events/update';
    this.getStatEventsurl= 'http://localhost:8080/events/stat';

  }
  getEvents():Observable<MyEvent[]>
  {
    return this.http.get<MyEvent[]>(this.getEventsurl);  
  }

  getEventById(id:any):Observable<MyEvent>
  {
    return this.http.get<MyEvent>(this.getEventByIdurl+'/'+id);  
  }

  deleteEvent(event : MyEvent):Observable<MyEvent>
  {
    return this.http.delete<MyEvent>(this.deleteEventsurl+'/'+event.id);   
  }

  addEvent(event : MyEvent):Observable<MyEvent>{
   return this.http.post<MyEvent>(this.addEventsurl,event);
  }
    updateEvent(event : MyEvent):Observable<MyEvent>
  {
    return this.http.put<MyEvent>(this.updateEventsurl+'/'+event.id,event);   
  }


  getStat(stat : StatEvent):Observable<number>{
    return this.http.post<number>(this.getStatEventsurl,stat);
   }
}
