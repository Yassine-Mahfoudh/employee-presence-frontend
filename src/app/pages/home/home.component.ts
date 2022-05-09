import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CalendarOptions, DateSelectArg, EventApi, EventClickArg } from '@fullcalendar/angular'; // useful for typechecking

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  currentEvents: EventApi[] = [];

  calendarOptions: CalendarOptions ={
    headerToolbar: {
      left: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
      center: 'title',
      right: 'AddNewEvent today prevYear,prev,next,nextYear'
    },
    customButtons: {
      AddNewEvent: { 
        text : 'Add new event ',
        click : function(){
          var newEvents = [
            {
              title: 'All Day Event 2',
              start: '2022-05-22',
            },
            {
              title: 'All Day Event 3',
              start: '2020-02-03',
            }
          ];
        }
      }
    },
    
    initialView: 'dayGridMonth',
    events: [
      { title: 'event 1', date: '2022-05-10' },
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


    ],
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this)
  };

  handleDateClick(arg) {
    alert('date click! ' + arg.dateStr)
  }
  handleDateSelect(selectInfo: DateSelectArg) {
    const title = prompt('Please enter a new title for your event');
  }
  handleEventClick(clickInfo: EventClickArg) {
    if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      clickInfo.event.remove();
      console.log(clickInfo.event.title);
      //this.remove(data);
    }
    }
    
    handleEvents(events: EventApi[]) {
    this.currentEvents = events;
    console.log(this.currentEvents);
    }
    
     
    constructor( ) { }

 

  ngOnInit(){
  }  

}
