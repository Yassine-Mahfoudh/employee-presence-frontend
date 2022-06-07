import { formatDate } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Employee } from 'src/app/core/models/employee';
import { MyEvent } from 'src/app/core/models/myevent';
import { EmployeeService } from 'src/app/core/services/employee.service';
import { EventService } from 'src/app/core/services/event.service';
import { GlobalConstants } from 'src/app/shared/constant/GlobalConstants';

@Component({
  selector: 'app-addevent',
  templateUrl: './addevent.component.html',
  styleUrls: ['./addevent.component.scss']
})
export class AddeventComponent implements OnInit {

  eventDetail!: FormGroup;
  eventobj: MyEvent = new MyEvent();
  eventlist:MyEvent[] = [];
  employeeList:Employee[]=[];

  etype
 nowDate = new Date(); 
 dateDebutButton = this.nowDate.getFullYear()+'/'+(this.nowDate.getMonth()+1)+'/'+this.nowDate.getDate();
  dateDebut
  constructor(private formBuilder : FormBuilder,
     @Inject(MAT_DIALOG_DATA) data,
     private myeventService: EventService,
     private employeeService:EmployeeService,
    config: NgbModalConfig,
      private modalService: NgbModal  ) 
    {
      console.log('data to Dialog :: ', data)
      this.dateDebut=data.dateDebut
        // customize default values of modals used by this component tree
 config.backdrop = 'static';
 config.keyboard = false;

      }

  ngOnInit(): void {
    this.getevents();
    this.getEmployees();
   
   
    
    this.eventDetail = this.formBuilder.group({
      id: [''],
      title:[null,[Validators.required, Validators.pattern(GlobalConstants.nameRegex),Validators.minLength(4)]],
      description:[''],
      datedebut: [this.dateDebut],
      datefin: [this.dateDebut],
      employee:[''],
      datedebutrecur:[this.dateDebut],
      datefinrecur:[this.dateDebut],
      frequency:[''],
      everyNday:[''],
      weekday:[''],
      everyNmonth:[''],
      monthday:[''],
      daypos:[''],
      byday:[''],
      onday:[''],
      eventtype:['']
     
    });

  
  }

  open(content) {
    this.modalService.open(content);
  }

  close(content) {
    this.modalService.dismissAll(content);
  }

  

  addEvent(){


    //static
    if (this.eventDetail.controls.eventtype.value=="Static"){
      this.eventobj.type=this.eventDetail.value.eventtype;
    this.eventobj.id=this.eventDetail.value.id;
    this.eventobj.title=this.eventDetail.value.title;
    this.eventobj.description=this.eventDetail.value.description;
    this.eventobj.start=this.eventDetail.value.datedebut;
    this.eventobj.end=this.eventDetail.value.datefin;
    this.eventobj.employee=this.eventDetail.value.employee.toString();
    this.eventobj.rrule=null;
    if(this.eventDetail.value.title==="Presentielle"){
      this.eventobj.color="#FF8B94";

      }
      else if(this.eventDetail.value.title==="à distance"){
        this.eventobj.color="#8D7BE0";
 
        }
        else{
          this.eventobj.color="#7fd3ed";

          }

  }
else {

    //recurrsive
    this.eventobj.type=this.eventDetail.value.eventtype;
    this.eventobj.id=this.eventDetail.value.id;
    this.eventobj.title=this.eventDetail.value.title;
    this.eventobj.description=this.eventDetail.value.description;
    this.eventobj.employee=this.eventDetail.value.employee.toString();
    this.eventobj.frequency=this.eventDetail.value.frequency;
    this.eventobj.start=this.eventDetail.value.datedebutrecur;
    this.eventobj.end=this.eventDetail.value.datefinrecur;


if(this.eventDetail.value.title==="Presentielle"){
  this.eventobj.color="#FF8B94";

  }
  else if(this.eventDetail.value.title==="à distance"){
    this.eventobj.color="#8D7BE0";

    }
    else{
      this.eventobj.color="#7fd3ed";

      }

    let startrecur =this.eventDetail.value.datedebutrecur;
      let yyyy=startrecur.substr(0,4)
      let mm=startrecur.substr(-5,2) 
      let dd=startrecur.substr(8,9) 
      let startr=yyyy+mm+dd

      
     

     let endrecur =this.eventDetail.value.datefinrecur;
     let YYYY=endrecur.substr(0,4)
     let MM=endrecur.substr(-5,2) 
     let DD=endrecur.substr(8,9) 
     let endr=YYYY+MM+DD



    if (this.eventDetail.value.frequency=="WEEKLY"){
      
      this.eventobj.rrule=`DTSTART:${startr}\nRRULE:FREQ=${this.eventDetail.value.frequency};UNTIL=${endr};BYDAY=${this.eventDetail.value.weekday};INTERVAL=${this.eventDetail.value.everyNday}`;
      this.eventobj.frequency="WEEKLY";
     // this.eventobj.weekday=this.eventDetail.value.weekday;
     // this.eventobj.everyNday=this.eventDetail.value.everyNday;
   
    }else{
      this.eventobj.frequency="MONTHLY" ;
     // this.eventobj.monthday=this.eventDetail.value.monthday;
     // this.eventobj.everyNmonth=this.eventDetail.value.everyNmonth;
      if(this.eventDetail.value.onday=="onday"){
        this.eventobj.rrule=`DTSTART:${startr}\nRRULE:FREQ=${this.eventDetail.value.frequency};UNTIL=${endr};BYMONTHDAY=${this.eventDetail.value.monthday};INTERVAL=${this.eventDetail.value.everyNmonth}`;
      }else{
        this.eventobj.rrule=`DTSTART:${startr}\nRRULE:FREQ=${this.eventDetail.value.frequency};UNTIL=${endr};BYSETPOS=${this.eventDetail.value.daypos};BYDAY=${this.eventDetail.value.byday};INTERVAL=${this.eventDetail.value.everyNmonth}`;
      }
    
    }
    


  }
  console.log('this.eventobj to add ::: ', this.eventobj)


    this.myeventService.addEvent(this.eventobj).subscribe(res=>{
      console.log(res);
      this.getevents();
      console.log("event type::",this.eventobj.type);
      //setTimeout("location.reload(true);",200);
    }
    );


}

eventType(val){
  (document.getElementById("status-select")as HTMLButtonElement).disabled = false;
   if (val == "Static"){
 ( document.querySelector<HTMLElement>(".add-static-event")).style.display= "block";
 (document.querySelector<HTMLElement>(".add-recursive-event")).style.display= "none";
  this.etype=val;
}
   if (val == "Recursive"){
   ( document.querySelector<HTMLElement>(".add-static-event")).style.display= "none";
     (document.querySelector<HTMLElement>(".add-recursive-event")).style.display= "block";
      this.etype=val;
    }
    
}

eventFrequence(val){
  (document.getElementById("frequence-select")as HTMLButtonElement).disabled = false;
   if (val == "WEEKLY"){
 ( document.querySelector<HTMLElement>(".weekly-frequence")).style.display= "block";
 (document.querySelector<HTMLElement>(".monthly-frequence")).style.display= "none";
}
   if (val == "MONTHLY"){
     (document.querySelector<HTMLElement>(".monthly-frequence")).style.display= "block";
     ( document.querySelector<HTMLElement>(".weekly-frequence")).style.display= "none";
    }
}


getEmployees(){
  this.employeeService.getEmployees().subscribe(res=>{
    this.employeeList=res;
    console.log();
  })
}

getevents(){
  this.myeventService.getEvents().subscribe(res=>{
    this.eventlist=res;
  })
}

editEvent(event : MyEvent){
  this.eventDetail.controls['id'].setValue(event.id);
  this.eventDetail.controls['title'].setValue(event.title);
  this.eventDetail.controls['description'].setValue(event.description);
  this.eventDetail.controls['datedebut'].setValue(event.start);
  this.eventDetail.controls['datefin'].setValue(event.end);
  this.eventDetail.controls['employee'].setValue(event.employee);
}

deleteEvent(event : MyEvent){

    this.myeventService.deleteEvent(event).subscribe(res=>{
      console.log(res);
      alert("event deleted successfully");
      this.getevents();
    }
    );
  
  }

updateEvent(){
  this.eventobj.id=this.eventDetail.value.id;
  this.eventobj.title=this.eventDetail.value.title;
  this.eventobj.description=this.eventDetail.value.description;
  this.eventobj.start=this.eventDetail.value.datedebut;
  this.eventobj.end=this.eventDetail.value.datefin;
  this.eventobj.employee=this.eventDetail.value.employee;
  this.myeventService.updateEvent(this.eventobj).subscribe(res=>{
    console.log(res);
    this.getevents();
  }
  );

}

confirmDelete(event: MyEvent) {
  if(confirm("Are you sure you want to delete event "+event.title)) {
     this.deleteEvent(event);
  }
}

handleClear(){
  this.eventDetail.reset();
}

}