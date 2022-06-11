import { formatDate } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CalendarOptions, DateSelectArg, EventApi, EventClickArg } from '@fullcalendar/angular'; // useful for typechecking
import { EventService } from 'src/app/core/services/event.service';
import { AddeventComponent } from '../addevent/addevent.component';
import { AjoutEvenementComponent } from '../ajout-evenement/ajout-evenement.component';
import { EditeventComponent } from '../editevent/editevent.component';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  currentEvents: EventApi[] = [];
  public myevents : any[];

  calendarOptions: CalendarOptions ={
    headerToolbar: {
      left: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
      center: 'title',
      right: 'AddNewEvent today prevYear,prev,next,nextYear'
    },
    
    customButtons: {
      AddNewEvent: { 
        text : 'Add new event',
        click : (arg) =>{ this.dialog.open(AjoutEvenementComponent,{data:{dateDebut:formatDate(new Date(),'yyyy-MM-dd','en') },height: '700px',
        width: '600px',
        autoFocus: false,})}
         
        
      }
    },
    
    initialView: 'dayGridMonth',
   
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
  };

  handleDateClick(arg) {
   
    alert('date click! ' + arg.dateStr)
   
  }
  handleDateSelect(arg) {

  console.log(' arg ::: ', arg)
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "550px";
    this.dialog.open(AjoutEvenementComponent,{data:{dateDebut:arg.startStr},width:'550px',height: '700px'})
  }
  handleEventClick(clickInfo: EventClickArg) {
    console.log('click Dialog :: ', clickInfo)
   // console.log('title to edit :: ',clickInfo.event._def.publicId )
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "550px";
    this.dialog.open(EditeventComponent,{
      data:{
        id:clickInfo.event._def.publicId
      },
      width:"550px"
    })
    }
    
    
     
    constructor(
      private eventService : EventService,
      private dialog:MatDialog,

     ) { }

 

  ngOnInit(){
   
   // this.calendarOptions.events=this.myevents;


    this.getEvents();
  }  

  getEvents(){
    this.eventService.getEvents().subscribe(res=>{
     this.myevents=res;
     this.calendarOptions.events=this.myevents;

    })
  }

  
}