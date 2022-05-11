import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MyEvent } from '../models/myevent';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  getEventsurl: string;

  constructor(private http:HttpClient) { 

    this.getEventsurl= 'http://localhost:8080/events';
  }
  getEvents():Observable<MyEvent[]>
  {
    return this.http.get<MyEvent[]>(this.getEventsurl);  
  }

}
