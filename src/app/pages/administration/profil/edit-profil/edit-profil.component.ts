import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GlobalConstants } from 'src/app/shared/constant/GlobalConstants';

@Component({
  selector: 'app-edit-profil',
  templateUrl: './edit-profil.component.html',
  styleUrls: ['./edit-profil.component.css']
})
export class EditProfilComponent implements OnInit {

   
  constructor(private dialog: MatDialogRef<EditProfilComponent, { data: any }>,
    @Inject(MAT_DIALOG_DATA) data) {
      this.profilDetail=new FormGroup({
        id: new FormControl(data.profil.id),
        description: new FormControl(data.profil.description,[Validators.required, Validators.pattern(GlobalConstants.nameRegex)]),
      });
      
     }

  ngOnInit(): void {
  }
  profilDetail: FormGroup

  getFormControl(key: string): FormControl {
    return this.profilDetail.controls[key] as FormControl;
  }

  onSuccessAdd() {

     if(this.profilDetail.valid){
      const data = this.profilDetail.getRawValue();

      this.dialog.close({
        data: data,
       
      });
    }
  }
  handleClear(){
    this.profilDetail.reset();
  }


}
