
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Employee } from 'src/app/core/models/employee';
import { MyEvent } from 'src/app/core/models/myevent';
import { RRule } from 'src/app/core/models/rrule';
import { Typedemande } from 'src/app/core/models/typedemande';
import { EmployeeService } from 'src/app/core/services/employee.service';
import { EventService } from 'src/app/core/services/event.service';
import { TypedemandeService } from 'src/app/core/services/typedemande.service';
import { GlobalConstants } from 'src/app/shared/constant/GlobalConstants';
import { SnackbarService } from 'src/app/shared/service/snackbar.service';
import { ConfirmDialogService } from '../administration/dialog-confirmation/confirm-dialog.service';

@Component({
  selector: 'app-editevent',
  templateUrl: './editevent.component.html',
  styleUrls: ['./editevent.component.scss']
})
export class EditeventComponent implements OnInit {

  eventDetail: FormGroup;
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
  constructor(private dialog: MatDialogRef<EditeventComponent, { data: any }>,
    @Inject(MAT_DIALOG_DATA) data,private formBuilder : FormBuilder,
    private employeeService:EmployeeService, private typedemandeService:TypedemandeService,
    private EventService:EventService  ,private confirmDialogService:ConfirmDialogService,
    private snackbar:SnackbarService
    
    ) { 

      this.dateDebut=data.dateDebut
      this.datefin=data.datefin
      this.id=data.id
      this.title=data.title;
      this.description=data.description
      this.type=data.type
      this.frequency=data.frequency;
      this.employee=data.employee
     
      this.eventDetail=new FormGroup({
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

    this.gettypeevent();
    this.getEmployees()
  }
  getFormControl(key: string): FormControl {
    return this.eventDetail.controls[key] as FormControl;
  }

  

 onSuccessUpdate() {
  

  if(this.eventDetail.valid){
   const data = this.eventDetail.getRawValue();

   this.dialog.close({
     data: data,
    
   });
 }

 else this.eventDetail.markAllAsTouched()
 
}
 handleClear(){
   this.eventDetail.reset();
 }
 TypeList:Typedemande[]=[];
 employeeList:Employee[]=[];
 getEmployees(){
  this.employeeService.getEmployees().subscribe(res=>{
    this.employeeList=res;
    console.log();
  })
}


confirmDelete(event: MyEvent){
  this.confirmDialogService.confirm('Confirmation','Voulez-vous confirmer cette opération ?').subscribe((res) => {
    if (res){  
      this.EventService.deleteEvent(event).subscribe(res=>{
        console.log(res);
        this.snackbar.openSnackBar("évènement suprimée","")
    this.getEvents()
      }
      );
   } })
  
  
  }


gettypeevent(){
  this.typedemandeService.getTypeDemandes().subscribe(res=>{
    this.TypeList=res;
    console.log("evet type::", this.TypeList);
  })
}

getEvents(){
  this.EventService.getEvents().subscribe(res=>{
   this.myevents=res;
    })
}

}
