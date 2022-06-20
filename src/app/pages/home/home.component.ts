import { formatDate } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CalendarOptions, DateSelectArg, EventApi, EventClickArg } from '@fullcalendar/angular'; // useful for typechecking
import { data } from 'jquery';
import { MyEvent } from 'src/app/core/models/myevent';
import { EventService } from 'src/app/core/services/event.service';
import { AjoutEvenementComponent } from '../ajout-evenement/ajout-evenement.component';
import { EditeventComponent } from '../editevent/editevent.component';
export function isEmpty(val: any): boolean {
  return val === null || typeof val === 'undefined' || val.toString().trim() === '';
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {


 eventDetail=new FormGroup({
    id: new FormControl(null),
    title: new FormControl(null),
    description: new FormControl(null),
    datedebut: new FormControl(null),
    datefin: new FormControl(null),
    employee: new FormControl(null),
    datedebutrecur: new FormControl(null),
    datefinrecur: new FormControl(null),
    frequency: new FormControl(null),
    everyNday: new FormControl(null),
    weekday: new FormControl(null),
    everyNmonth: new FormControl(null),
    monthday: new FormControl(null),
    daypos: new FormControl(null),
    byday: new FormControl(null),
    onday: new FormControl(null),
    eventtype: new FormControl(null),
  });  

  currentEvents: EventApi[] = [];
  public myevents : any[];
  eventlist:MyEvent[] = [];
  eventobj: MyEvent = new MyEvent();

  
  constructor(
    private myeventService: EventService,
    private eventService : EventService,
    private dialog:MatDialog)
     { }
    
     ngOnInit(){
      this.getEvents();
      
    }
  calendarOptions: CalendarOptions ={
    headerToolbar: {
      left: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
      center: 'title',
      right: 'AddNewEvent today prevYear,prev,next,nextYear'
    },
    
    customButtons: {
      AddNewEvent: { 
        text : 'Add new event',
        click : (arg) =>{ const dialogRef= this.dialog.open(AjoutEvenementComponent,
          {data:{dateDebut:formatDate(new Date(),'yyyy-MM-dd','en') }
          ,width:'550px',height: '700px', 
          disableClose: true, autoFocus: false});
       
        dialogRef.afterClosed().subscribe((result) => {
          if (!isEmpty(result))
           {    
            console.log("result:::",result)
            if (result.data.eventtype=="Static"){
    
            
            this.eventobj.id=result.data.id;
            this.eventobj.type=result.data.eventtype;
              this.eventobj.title=result.data.title;
              this.eventobj.description=result.data.description;
              this.eventobj.start=result.data.datedebut;
              this.eventobj.end=result.data.datefin;
              this.eventobj.employee=result.data.employee.toString();
              this.eventobj.rrule=null;
              if(result.data.title==="Présentiel"){
                this.eventobj.color="#FF8B94";
          
                }
                else if(result.data.title==="À distance"){
                  this.eventobj.color="#8D7BE0";
           
                  }
                  else{
                    this.eventobj.color="#7fd3ed";
                    }
    
                  }
                  else
                  {
                    this.eventobj.id=result.data.id;
                    this.eventobj.type=result.data.eventtype;
                      this.eventobj.title=result.data.title;
                      this.eventobj.description=result.data.description;
                      this.eventobj.start=result.data.datedebut;
                      this.eventobj.end=result.data.datefin;
                      this.eventobj.frequency=result.data.frequency;
                      this.eventobj.employee=result.data.employee.toString();
                      if(result.data.title==="Présentiel"){
                        this.eventobj.color="#FF8B94";
                  
                        }
                        else if(result.data.title==="À distance"){
                          this.eventobj.color="#8D7BE0";
                   
                          }
                          else{
                            this.eventobj.color="#7fd3ed";
                            }
                            
                            let startrecur =result.data.datedebut;
                            let yyyy=startrecur.substr(0,4)
                            let mm=startrecur.substr(-5,2) 
                            let dd=startrecur.substr(8,9) 
                            let startr=yyyy+mm+dd
                      
                           let endrecur =result.data.datefin;
                           let YYYY=endrecur.substr(0,4)
                           let MM=endrecur.substr(-5,2) 
                           let DD=endrecur.substr(8,9) 
                           let endr=YYYY+MM+DD
                      
                      
                      
                          if (result.data.frequency=="WEEKLY"){
                            
                            this.eventobj.rrule=`DTSTART:${startr}\nRRULE:FREQ=${result.data.frequency};UNTIL=${endr};BYDAY=${result.data.weekday};INTERVAL=${result.data.everyNday}`;
                            this.eventobj.frequency="WEEKLY";
                         
                          }else{
                            this.eventobj.frequency="MONTHLY" ;
                            if(result.data.onday=="onday"){
                              this.eventobj.rrule=`DTSTART:${startr}\nRRULE:FREQ=${result.data.frequency};UNTIL=${endr};BYMONTHDAY=${result.data.monthday};INTERVAL=${result.data.everyNmonth}`;
                            }else{
                              this.eventobj.rrule=`DTSTART:${startr}\nRRULE:FREQ=${result.data.frequency};UNTIL=${endr};BYSETPOS=${result.data.daypos};BYDAY=${result.data.byday};INTERVAL=${result.data.everyNmonth}`;
                            }
                          
                          }
                          
                      
    
    
                  }
          this.myeventService.addEvent(this.eventobj).subscribe(res=>{
            this.getEvents();
          });
        }
        });  
        
        
      }
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
    const dialogRef= this.dialog.open(AjoutEvenementComponent,
      {data:{dateDebut:arg.startStr}
      ,width:'550px',height: '700px', 
      disableClose: true,});
    dialogRef.afterClosed().subscribe((result) => {
      if (!isEmpty(result))
       {    
        console.log("result:::",result)
        if (result.data.eventtype=="Static"){

        
        this.eventobj.id=result.data.id;

        this.eventobj.employeeid=result.data.employee.id;
        this.eventobj.type=result.data.eventtype;
          this.eventobj.title=result.data.title;
          this.eventobj.description=result.data.description;
          this.eventobj.start=result.data.datedebut;
          this.eventobj.end=result.data.datefin;
          this.eventobj.employee=result.data.employee.toString();
          this.eventobj.rrule=null;
          if(result.data.title==="Présentiel"){
            this.eventobj.color="#FF8B94";
      
            }
            else if(result.data.title==="À distance"){
              this.eventobj.color="#8D7BE0";
       
              }
              else{
                this.eventobj.color="#7fd3ed";
                }

              }
              else
              {
                this.eventobj.id=result.data.id;
                this.eventobj.employeeid=result.data.employee.id;
                this.eventobj.type=result.data.eventtype;
                  this.eventobj.title=result.data.title;
                  this.eventobj.description=result.data.description;
                  this.eventobj.start=result.data.datedebut;
                  this.eventobj.end=result.data.datefin;
                  this.eventobj.frequency=result.data.frequency;
                  this.eventobj.employee=result.data.employee.toString();
                  if(result.data.title==="Présentiel"){
                    this.eventobj.color="#FF8B94";
              
                    }
                    else if(result.data.title==="À distance"){
                      this.eventobj.color="#8D7BE0";
               
                      }
                      else{
                        this.eventobj.color="#7fd3ed";
                        }
                        
                        let startrecur =result.data.datedebut;
                        let yyyy=startrecur.substr(0,4)
                        let mm=startrecur.substr(-5,2) 
                        let dd=startrecur.substr(8,9) 
                        let startr=yyyy+mm+dd
                  
                       let endrecur =result.data.datefin;
                       let YYYY=endrecur.substr(0,4)
                       let MM=endrecur.substr(-5,2) 
                       let DD=endrecur.substr(8,9) 
                       let endr=YYYY+MM+DD
                  
                  
                  
                      if (result.data.frequency=="WEEKLY"){
                        
                        this.eventobj.rrule=`DTSTART:${startr}\nRRULE:FREQ=${result.data.frequency};UNTIL=${endr};BYDAY=${result.data.weekday};INTERVAL=${result.data.everyNday}`;
                        this.eventobj.frequency="WEEKLY";
                     
                      }else{
                        this.eventobj.frequency="MONTHLY" ;
                        if(result.data.onday=="onday"){
                          this.eventobj.rrule=`DTSTART:${startr}\nRRULE:FREQ=${result.data.frequency};UNTIL=${endr};BYMONTHDAY=${result.data.monthday};INTERVAL=${result.data.everyNmonth}`;
                        }else{
                          this.eventobj.rrule=`DTSTART:${startr}\nRRULE:FREQ=${result.data.frequency};UNTIL=${endr};BYSETPOS=${result.data.daypos};BYDAY=${result.data.byday};INTERVAL=${result.data.everyNmonth}`;
                        }
                      
                      }
                      
                  


              }
      this.myeventService.addEvent(this.eventobj).subscribe(res=>{
        this.getEvents();
      });
    }
    });  
    
  }


  handleEventClick(arg) {
    console.log(' arg ::: ', arg)
    const dialogRef= this.dialog.open(EditeventComponent,
      {data:{dateDebut:formatDate(arg.event._instance.range.start,'yyyy-MM-dd','en'),
        datefin:formatDate(arg.event._instance.range.end,'yyyy-MM-dd','en'),
        id:arg.event._def.publicId,
      title:arg.event._def.title,
      description:arg.event._def.extendedProps.description,
      type:arg.event._def.extendedProps.type,
      frequency:arg.event._def.extendedProps.frequency,
      employee:arg.event._def.extendedProps.employee,
    }
      ,width:'550px',height: '700px', 
      disableClose: true,});
    dialogRef.afterClosed().subscribe((result) => {
      if (!isEmpty(result))
       {    
        console.log("result:::",result)
        if (result.data.eventtype=="Static"){
     
        this.eventobj.id=result.data.id;
        this.eventobj.type=result.data.eventtype;
          this.eventobj.title=result.data.title;
          this.eventobj.description=result.data.description;
          this.eventobj.start=result.data.datedebut;
          this.eventobj.end=result.data.datefin;
          this.eventobj.employee=result.data.employee.toString();
          this.eventobj.rrule=null;
          if(result.data.title==="Présentiel"){
            this.eventobj.color="#FF8B94";
      
            }
            else if(result.data.title==="À distance"){
              this.eventobj.color="#8D7BE0";
       
              }
              else{
                this.eventobj.color="#7fd3ed";
                }

              }
              else
              {
                this.eventobj.id=result.data.id;
                this.eventobj.type=result.data.eventtype;
                  this.eventobj.title=result.data.title;
                  this.eventobj.description=result.data.description;
                  this.eventobj.start=result.data.datedebut;
                  this.eventobj.end=result.data.datefin;
                  this.eventobj.frequency=result.data.frequency;
                  this.eventobj.employee=result.data.employee.toString();
                  if(result.data.title==="Présentiel"){
                    this.eventobj.color="#FF8B94";
              
                    }
                    else if(result.data.title==="À distance"){
                      this.eventobj.color="#8D7BE0";
               
                      }
                      else{
                        this.eventobj.color="#7fd3ed";
                        }
                        
                        let startrecur =result.data.datedebut;
                        let yyyy=startrecur.substr(0,4)
                        let mm=startrecur.substr(-5,2) 
                        let dd=startrecur.substr(8,9) 
                        let startr=yyyy+mm+dd
                  
                       let endrecur =result.data.datefin;
                       let YYYY=endrecur.substr(0,4)
                       let MM=endrecur.substr(-5,2) 
                       let DD=endrecur.substr(8,9) 
                       let endr=YYYY+MM+DD
                  
                  
                  
                      if (result.data.frequency=="WEEKLY"){
                        
                        this.eventobj.rrule=`DTSTART:${startr}\nRRULE:FREQ=${result.data.frequency};UNTIL=${endr};BYDAY=${result.data.weekday};INTERVAL=${result.data.everyNday}`;
                        this.eventobj.frequency="WEEKLY";
                     
                      }else{
                        this.eventobj.frequency="MONTHLY" ;
                        if(result.data.onday=="onday"){
                          this.eventobj.rrule=`DTSTART:${startr}\nRRULE:FREQ=${result.data.frequency};UNTIL=${endr};BYMONTHDAY=${result.data.monthday};INTERVAL=${result.data.everyNmonth}`;
                        }else{
                          this.eventobj.rrule=`DTSTART:${startr}\nRRULE:FREQ=${result.data.frequency};UNTIL=${endr};BYSETPOS=${result.data.daypos};BYDAY=${result.data.byday};INTERVAL=${result.data.everyNmonth}`;
                        }
                      
                      }
                      

              }
      this.myeventService.updateEvent(this.eventobj).subscribe(res=>{
      
      });
    }
    });  
    
  }
    
    
   

  getEvents(){
    this.eventService.getEvents().subscribe(res=>{
     this.myevents=res;
     this.calendarOptions.events=this.myevents;
console.log(" this.calendarOptions.events:: ", this.calendarOptions.events)    })
  }

  
}