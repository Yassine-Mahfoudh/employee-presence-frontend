import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Profil } from 'src/app/core/models/profil';
import { GlobalConstants } from 'src/app/shared/constant/GlobalConstants';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  profilList:Profil[] = [];
  constructor(  private dialog: MatDialogRef<AddUserComponent, { data: any }>,
    @Inject(MAT_DIALOG_DATA) data) { 
      this.profilList=data.profilList
    }

  ngOnInit(): void {
  }
  userDetail: FormGroup=new FormGroup({
    id: new FormControl(null),
    userName: new FormControl(null,[Validators.required, Validators.pattern(GlobalConstants.nameRegex)]),
    userPassword: new FormControl(null,[Validators.required,Validators.minLength(4),Validators.pattern(GlobalConstants.nameRegex)]),
    email: new FormControl(null,[Validators.required, Validators.pattern(GlobalConstants.emailRegex)]),
    profil: new FormControl(null),

  });;

  getFormControl(key: string): FormControl {
    return this.userDetail.controls[key] as FormControl;
  }

  onSuccessAdd() {
  

     if(this.userDetail.valid){
      const data = this.userDetail.getRawValue();

      this.dialog.close({
        data: data,
       
      });
    }
    else 
    this.userDetail.markAllAsTouched()
  }
  handleClear(){
    this.userDetail.reset();
  }
}
