
import { formatDate } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CalendarOptions, DateSelectArg, EventApi, EventClickArg } from '@fullcalendar/angular'; // useful for typechecking
import { EventService } from 'src/app/core/services/event.service';
import { DetailsEventComponent } from '../details-event/details-event.component';
import { EditeventComponent } from '../editevent/editevent.component';
@Component({
  selector: 'app-user-calendar',
  templateUrl: './user-calendar.component.html',
  styleUrls: ['./user-calendar.component.css']
})
export class UserCalendarComponent implements OnInit {

  currentEvents: EventApi[] = [];
  public myevents : any[];

  calendarOptions: CalendarOptions ={
    headerToolbar: {
      left: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
      center: 'title',
      right: ' today prevYear,prev,next,nextYear'
    },
    
    

    
    initialView: 'dayGridMonth',

   
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
 
    eventClick: this.handleEventClick.bind(this),
  };

  handleDateClick(arg) {
   
    alert('date click! ' + arg.dateStr)
   
  }

  handleEventClick(clickInfo: EventClickArg) {
    console.log('click Dialog :: ', clickInfo)
   // console.log('title to edit :: ',clickInfo.event._def.publicId )
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "550px";
    this.dialog.open(DetailsEventComponent,{
      data:{
        id:clickInfo.event._def.publicId,
        title:clickInfo.event._def.title
      },
      width:"550px"
    })
    }
    
    constructor(
      private eventService : EventService,
      private dialog:MatDialog,

     ) { }

 

  ngOnInit(){

    this.getEvents();
  }  

  getEvents(){
    this.eventService.getEvents().subscribe(res=>{
     this.myevents=res;
     this.calendarOptions.events=this.myevents;
     console.log(this.myevents)
    })
  }

}
