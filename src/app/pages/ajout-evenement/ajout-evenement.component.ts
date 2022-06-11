import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Employee } from 'src/app/core/models/employee';
import { EmployeeService } from 'src/app/core/services/employee.service';
import { GlobalConstants } from 'src/app/shared/constant/GlobalConstants';

@Component({
  selector: 'app-ajout-evenement',
  templateUrl: './ajout-evenement.component.html',
  styleUrls: ['./ajout-evenement.component.css']
})
export class AjoutEvenementComponent implements OnInit {
  eventDetail: FormGroup;
  dateDebut
  constructor(private dialog: MatDialogRef<AjoutEvenementComponent, { data: any }>,
    @Inject(MAT_DIALOG_DATA) data,private formBuilder : FormBuilder,
    private employeeService:EmployeeService,) { 
      this.dateDebut=data.dateDebut
    }

  ngOnInit(): void {
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
    this.getEmployees()
  }
  getFormControl(key: string): FormControl {
    return this.eventDetail.controls[key] as FormControl;
  }

  onSuccessAdd() {
  console.log('this.eventDetail : ', this.eventDetail)
  console.log('val : ', this.eventDetail.value.frequency)
  console.log('val rec: ', this.eventDetail.value.eventtype)
  

  //   if(this.eventDetail.valid){
  //    const data = this.eventDetail.getRawValue();

  //    this.dialog.close({
  //      data: data,
      
  //    });
  //  }
 }
 handleClear(){
   this.eventDetail.reset();
 }
 employeeList:Employee[]=[];
 getEmployees(){
  this.employeeService.getEmployees().subscribe(res=>{
    this.employeeList=res;
    console.log();
  })
}


}
