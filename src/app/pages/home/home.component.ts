import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CalendarOptions, DateSelectArg, EventApi, EventClickArg } from '@fullcalendar/angular'; // useful for typechecking
import { EventService } from 'src/app/core/services/event.service';
import { AddeventComponent } from '../addevent/addevent.component';
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
      right: 'today prevYear,prev,next,nextYear'
    },
    buttonText: {
      today:    'Aujourd\'hui',
      month:    'Mois',
      week:     'Semaine',
      day:      'Jour',
      list:     'Liste'
  },
  locale: 'fr',
   /* customButtons: {
      AddNewEvent: { 
        text : 'Add new event',
        click : function(){
        
        }
      }
    },*/
    
    initialView: 'dayGridMonth',
    /*events: [
      {
        title: 'event 1',
        rrule : {
          freq: 'weekly',
          //a day, daily, weekly, every two weeks and monthly
          byweekday: [ 'mo', 'fr' ],
          dtstart: '2022-05-14',
          until: '2022-05-27'
        }
     },
      { title: 'event 2', date: '2022-05-12' },
      {
        title  : 'event3',
        start  : '2022-05-21',
        end    : '2022-05-24',
        color: 'yellow',   // an option!
        textColor: 'black', // an option!
      //  editable : true
      description: 'Lecture',
      extendedProps : {
        department: 'BioChemistry'
      }

      },
      {
        title  : 'event4',
        start  : '2022-05-26T12:30:00',
        allDay : false, // will make the time show
        color: 'yellow',   // an option!
        textColor: 'black', // an option!
        description : 'le soir'
      }


    ],*/
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
  };

  /*
  handleDateClick(arg) {
    alert('date click! ' + arg.dateStr)
  }
*/

  handleDateSelect() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "550px";
    this.dialog.open(AddeventComponent,dialogConfig)
  }
  handleEventClick(clickInfo: EventClickArg) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "550px";
    this.dialog.open(EditeventComponent,dialogConfig)
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
    })
  }
}
