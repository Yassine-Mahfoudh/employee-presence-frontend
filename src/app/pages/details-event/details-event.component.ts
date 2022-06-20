import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MyEvent } from 'src/app/core/models/myevent';
import { EventService } from 'src/app/core/services/event.service';
import { CommonModule } from '@angular/common';  
import { BrowserModule } from '@angular/platform-browser';
import { SnackbarService } from 'src/app/shared/service/snackbar.service';
import { EmployeeService } from 'src/app/core/services/employee.service';
import { ConfirmDialogService } from '../services_generiques/confirm-dialog.service';
import { TypedemandeService } from 'src/app/core/services/typedemande.service';
import { Employee } from 'src/app/core/models/employee';

@Component({
  selector: 'app-details-event',
  templateUrl: './details-event.component.html',
  styleUrls: ['./details-event.component.scss']
})
export class DetailsEventComponent implements OnInit {

  public eventDetails: FormGroup;
  eventemployeelist:any

  myevents:MyEvent[];
    event: MyEvent = new MyEvent();
    dateDebut
    id
    title
    description
    type
    frequency
    employee
    datefin


    constructor(private dialog: MatDialogRef<DetailsEventComponent, { data: any }>,
      @Inject(MAT_DIALOG_DATA) data,private formBuilder : FormBuilder,
      private employeeService:EmployeeService, private typedemandeService:TypedemandeService,
      private EventService:EventService  ,private confirmDialogService:ConfirmDialogService,
      private snackbar:SnackbarService )
       { 
  
        this.dateDebut=data.dateDebut
        this.datefin=data.datefin
        this.id=data.id
        this.title=data.title;
        this.description=data.description
        this.type=data.type
        this.frequency=data.frequency;
        this.employee=data.employee
       
        this.eventDetails=new FormGroup({
          id: new FormControl(this.id),
          title: new FormControl( this.title),
          description: new FormControl( this.description),
          datedebut: new FormControl(  this.dateDebut),
          datefin: new FormControl(this.datefin),
          employee: new FormControl( this.employee),
          datedebutrecur: new FormControl(null),
          datefinrecur: new FormControl(null),
          frequency: new FormControl( this.frequency),
          everyNday: new FormControl(null),
          weekday: new FormControl(null),
          everyNmonth: new FormControl(null),
          monthday: new FormControl(null),
          daypos: new FormControl(null),
          byday: new FormControl(null),
          onday: new FormControl(null),
          eventtype: new FormControl(this.type),
        }); 
      }

  ngOnInit(): void {
   this.geteventbyid()
  }
  getFormControl(key: string): FormControl {
    return this.eventDetails.controls[key] as FormControl;
  }

geteventbyid(){
this.EventService.getEventById( this.id).subscribe(res=>{
console.log(res);
this.event=res;
this.eventemployeelist=this.event.employee.split(",");

})

}

handleClear(){
  this.eventDetails.reset();
}
  onSuccessUpdate() {
  

    if(this.eventDetails.valid){
     const data = this.eventDetails.getRawValue();
  
     this.dialog.close({
       data: data,
      
     });
   }
  
   else this.eventDetails.markAllAsTouched()
   
  }

   
    
}
