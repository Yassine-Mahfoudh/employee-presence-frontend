
import { formatDate } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CalendarOptions, DateSelectArg, EventApi, EventClickArg } from '@fullcalendar/angular'; // useful for typechecking
import { type } from 'os';
import { MyEvent } from 'src/app/core/models/myevent';
import { AuthService } from 'src/app/core/services/auth.service';
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
  public employeevents : MyEvent[];

  calendarOptions: CalendarOptions ={
    headerToolbar: {
      left: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
      center: 'title',
      right:  'today prevYear,prev,next,nextYear'
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
      private authService : AuthService,
      private dialog:MatDialog,

     ) { }

 

  ngOnInit(){

    this.getEvents();
  }  

  
  getEvents(){
    const results: any[] = [];
    this.eventService.getEvents().subscribe(res=>{
     this.myevents=res;
    

     this.myevents.forEach(event=> event.employee.split(',').forEach(employee=>{if(employee===this.authService.getUserEmployee().firstname)
      {
    
      results.push(event);
     }} ));

let theRoles:any[]=[]
theRoles=this.authService.getRoles();
let test=false;

for(let i=0;i<theRoles.length;i++){
if (theRoles[i].name==="MANAGER"){
test=true;
}
}

if (test)
      {
        this.calendarOptions.events=this.myevents;
        console.log('all-event : ',this.myevents);
      } 
      else
      {
        this.calendarOptions.events=results;
        console.log("results:",results)
      }

/*this.authService.getRoles().forEach(roles=>roles.forEach(name=>{
        if (name==="MANAGER")
      {
        this.calendarOptions.events=this.myevents;
        console.log('all-event : ',this.myevents);
      
      } 
      else
      {
        this.calendarOptions.events=results;
        console.log("results:",results)
        console.log("myt role ::",this.authService.getRoles())
      }

  } )
 
  )*/
   














    })
  }

 

  


}
