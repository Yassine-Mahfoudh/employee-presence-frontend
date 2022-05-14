import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MyEvent } from '../models/myevent';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  getEventsurl: string;
  getEventByTitleurl: string;
  addEventsurl: string;
  deleteEventsurl: string;
  updateEventsurl: string;


  constructor(private http:HttpClient) { 

    this.getEventsurl= 'http://localhost:8080/events';
    this.getEventByTitleurl='http://localhost:8080/events/find/title'
    this.addEventsurl= 'http://localhost:8080/events/add';
    this.deleteEventsurl= 'http://localhost:8080/events/delete';
    this.updateEventsurl= 'http://localhost:8080/events/update';
  }
  getEvents():Observable<MyEvent[]>
  {
    return this.http.get<MyEvent[]>(this.getEventsurl);  
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

  getEventByTitle(title: String) {
    return this.http.get<MyEvent>(this.getEventByTitleurl + '/' + title);
  }

}
