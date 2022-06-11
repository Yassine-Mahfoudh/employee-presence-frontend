import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GlobalConstants } from 'src/app/shared/constant/GlobalConstants';
import { AddDepartementComponent } from '../add-departement/add-departement.component';

@Component({
  selector: 'app-edit-departement',
  templateUrl: './edit-departement.component.html',
  styleUrls: ['./edit-departement.component.css']
})
export class EditDepartementComponent implements OnInit {

 
  constructor(private dialog: MatDialogRef<EditDepartementComponent, { data: any }>,
    @Inject(MAT_DIALOG_DATA) data) {
      this.departementDetail=new FormGroup({
        id: new FormControl(data.departement.id),
        name: new FormControl(data.departement.name,[Validators.required, Validators.pattern(GlobalConstants.nameRegex)]),
      });
      
     }

  ngOnInit(): void {
  }
  departementDetail: FormGroup

  getFormControl(key: string): FormControl {
    return this.departementDetail.controls[key] as FormControl;
  }

  onSuccessAdd() {

     if(this.departementDetail.valid){
      const data = this.departementDetail.getRawValue();

      this.dialog.close({
        data: data,
       
      });
    }
  }
  handleClear(){
    this.departementDetail.reset();
  }

}
