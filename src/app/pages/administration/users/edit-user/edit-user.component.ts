import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Profil } from 'src/app/core/models/profil';
import { GlobalConstants } from 'src/app/shared/constant/GlobalConstants';
import { ConfirmDialogService } from '../../dialog-confirmation/confirm-dialog.service';
import { AddUserComponent } from '../add-user/add-user.component';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  profilList:Profil[] = [];
  profilselected:string[]=[]
  constructor(private confirmDialogService:ConfirmDialogService,private dialog: MatDialogRef<EditUserComponent, { data: any }>,
    @Inject(MAT_DIALOG_DATA) data) { 
      this.profilList=data.profilList
      data.user.profils.filter(element => {
        this.profilselected.push(element.name)
      });
console.log('data ::: ', data)
      this.userDetail=new FormGroup({
        id: new FormControl(data.user.id),
        userName: new FormControl(data.user.userName,[Validators.required, Validators.pattern(GlobalConstants.nameRegex)]),
        email: new FormControl(data.user.email,[Validators.required, Validators.pattern(GlobalConstants.emailRegex)]),
        profil: new FormControl(this.profilselected),
    
      });;
    }
  ngOnInit(): void {
  }
  userDetail: FormGroup
  getFormControl(key: string): FormControl {
    return this.userDetail.controls[key] as FormControl;
  }

  onSuccessUpdate() {
  this.confirmDialogService.confirm('Confirmation','Voulez-vous confirmer cette opération ?').subscribe((res) => {
      if (res){  
        if(this.userDetail.valid){
          const data = this.userDetail.getRawValue();
          this.dialog.close({
            data: data,
          });
        }
        else this.userDetail.markAllAsTouched()
    }
  })
  
  }
  handleClear(){
    this.userDetail.reset();
  }
}
