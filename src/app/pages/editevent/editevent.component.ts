import { NullTemplateVisitor } from '@angular/compiler';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Employee } from 'src/app/core/models/employee';
import { MyEvent } from 'src/app/core/models/myevent';
import { RRule } from 'src/app/core/models/rrule';
import { EmployeeService } from 'src/app/core/services/employee.service';
import { EventService } from 'src/app/core/services/event.service';
import { GlobalConstants } from 'src/app/shared/constant/GlobalConstants';

@Component({
  selector: 'app-editevent',
  templateUrl: './editevent.component.html',
  styleUrls: ['./editevent.component.scss']
})
export class EditeventComponent implements OnInit {

  
  eventDetail!: FormGroup;
  eventobj: MyEvent = new MyEvent();
  rruleObject : RRule = new RRule();
  eventlist:MyEvent[] = [];
  employeeList:Employee[]=[];
  eventbyid: MyEvent = new MyEvent();
  
 etype
  dateDebut
  id
  val
  constructor(private formBuilder : FormBuilder,
     @Inject(MAT_DIALOG_DATA) data,
     private myeventService: EventService,
     private employeeService:EmployeeService,
    config: NgbModalConfig,
      private modalService: NgbModal  ) 
    {
      console.log('data to Dialog :: ', data)
      this.dateDebut=data.dateDebut
      this.id=data.id;
        // customize default values of modals used by this component tree
 config.backdrop = 'static';
 config.keyboard = false;

      }

  ngOnInit(): void {
    this.val= this.geteventbyid();
    this.getevents();
    this.getEmployees();
  
  this.editEvent();
    
    this.eventDetail = this.formBuilder.group({
      id: [''],
      title:['',[Validators.required, Validators.pattern(GlobalConstants.nameRegex),Validators.minLength(4)]],
      description:[''],
      datedebut: [],
      datefin: [],
      employee:[''],
      datedebutrecur:[],
      datefinrecur:[],
      frequency:[''],
      everyNday:[''],
      weekday:[''],
      everyNmonth:[''],
      monthday:[''],
      daypos:[''],
      byday:[''],
      onday:[''],
      eventtype:[]
     
    });

  
  }

  open(content) {
    this.modalService.open(content);
  }

  close(content) {
    this.modalService.dismissAll(content);
  }



  

getEmployees(){
  this.employeeService.getEmployees().subscribe(res=>{
    this.employeeList=res;
    console.log();
  })
}
geteventbyid(){
  this.myeventService.getEventById(this.id).subscribe(res=>{
    this.eventbyid=res;
    return this.eventbyid.type;
  })
}

getevents(){
  this.myeventService.getEvents().subscribe(res=>{
    this.eventlist=res;
   
 
  })
}





editEvent(){
  
  if(this.val=="Static"){
{
console.log("event static");
 //( document.querySelector<HTMLElement>(".add-static-event")).style.display= "block";
 //(document.querySelector<HTMLElement>(".add-recursive-event")).style.display= "none";
 
} if (this.val == "Recursive"){
  console.log("event static");
   //( document.querySelector<HTMLElement>(".add-static-event")).style.display= "none";
    // (document.querySelector<HTMLElement>(".add-recursive-event")).style.display= "block";
 
    }
  }

  //this.eventDetail.controls['id'].setValue(this.eventbyid.id);
  //this.eventDetail.controls['title'].setValue( this.eventbyid.title);
  //this.eventDetail.controls['description'].setValue( this.eventbyid.description);
  //this.eventDetail.controls['datedebut'].setValue( this.eventbyid.start);
  //this.eventDetail.controls['datefin'].setValue( this.eventbyid.end);
  //this.eventDetail.controls['employee'].setValue( this.eventbyid.employee);



}

deleteEvent(){

    this.myeventService.deleteEvent(this.eventDetail.value.title).subscribe(res=>{
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

confirmDelete() {
  if(confirm("Are you sure you want to delete event "+this.eventDetail.value.title)) {
     this.deleteEvent();
  }
}

handleClear(){
  this.eventDetail.reset();
}


}
