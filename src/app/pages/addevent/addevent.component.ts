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
      datedebut: [this.dateDebut],
      datefin: [''],
      employee:['']
    });
  }

  open(content) {
    this.modalService.open(content);
  }

  close(content) {
    this.modalService.dismissAll(content);
  }

 

  addEvent(){

    console.log(this.eventDetail);
    this.eventobj.id=this.eventDetail.value.id;
    this.eventobj.title=this.eventDetail.value.title;
    this.eventobj.start=this.eventDetail.value.datedebut;
    this.eventobj.end=this.eventDetail.value.datefin;
    this.eventobj.employee=this.eventDetail.value.employee;
    this.myeventService.addEvent(this.eventobj).subscribe(res=>{
      console.log(res);
      this.getevents();
      //setTimeout("location.reload(true);",500);

    }
    );


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