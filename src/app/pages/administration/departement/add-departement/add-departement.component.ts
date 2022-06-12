import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GlobalConstants } from 'src/app/shared/constant/GlobalConstants';

@Component({
  selector: 'app-add-departement',
  templateUrl: './add-departement.component.html',
  styleUrls: ['./add-departement.component.css']
})
export class AddDepartementComponent implements OnInit {
  departementDetail: FormGroup=new FormGroup({
    id: new FormControl(null),
    name: new FormControl(null,[Validators.required, Validators.pattern(GlobalConstants.nameRegex)]),
  });
  
  constructor(private dialog: MatDialogRef<AddDepartementComponent, { data: any }>,
    @Inject(MAT_DIALOG_DATA) data) { }

  ngOnInit(): void {
  }
 

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
    else this.departementDetail.markAllAsTouched()

  }
  handleClear(){
    this.departementDetail.reset();
  }
}
