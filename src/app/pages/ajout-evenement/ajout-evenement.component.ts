import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Employee } from 'src/app/core/models/employee';
import { Typedemande } from 'src/app/core/models/typedemande';
import { EmployeeService } from 'src/app/core/services/employee.service';
import { TypedemandeService } from 'src/app/core/services/typedemande.service';
import { GlobalConstants } from 'src/app/shared/constant/GlobalConstants';

@Component({
  selector: 'app-ajout-evenement',
  templateUrl: './ajout-evenement.component.html',
  styleUrls: ['./ajout-evenement.component.css']
})
export class AjoutEvenementComponent implements OnInit {

 
  eventDetail:FormGroup;
  constructor(private dialog: MatDialogRef<AjoutEvenementComponent, { data: any }>,
    @Inject(MAT_DIALOG_DATA) data,private formBuilder : FormBuilder,
    private employeeService:EmployeeService,
    private typedemandeService:TypedemandeService) { 
      

    this.eventDetail=new FormGroup({
      id: new FormControl(null),
      title: new FormControl(null),
      description: new FormControl(null),
      datedebut: new FormControl(data.dateDebut),
      datefin: new FormControl(data.dateDebut),
      employee: new FormControl(null),
      employeeid: new FormControl(null),
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
      periode:new FormControl(data.periode),
    });    }
  ngOnInit(): void {
   
    this.getEmployees()
    this.gettypeevent()
   
  }
  getFormControl(key: string): FormControl {
    return this.eventDetail.controls[key] as FormControl;
  }

  onSuccessAdd() {
    if(this.eventDetail.valid){
      const data = this.eventDetail.getRawValue();

      this.dialog.close({
        data: data,
       
      });
    }    else this.eventDetail.markAllAsTouched()
 }
 handleClear(){
   this.eventDetail.reset();
 }
 employeeList:Employee[]=[];
 TypeList:Typedemande[]=[];
 getEmployees(){
  this.employeeService.getEmployees().subscribe(res=>{
    this.employeeList=res;
    console.log();
  })
}
periode=false
onDataChange(event) {
  if(event.value=="1"){
    this.periode=false
  }
  else
  this.periode=true

  console.log(event.value);    
return this.periode
}
gettypeevent(){
  this.typedemandeService.getTypeDemandes().subscribe(res=>{
    this.TypeList=res;
    console.log("evet type::", this.TypeList);
  })
}


}
