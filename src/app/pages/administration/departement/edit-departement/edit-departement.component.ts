import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GlobalConstants } from 'src/app/shared/constant/GlobalConstants';
import { ConfirmDialogService } from '../../dialog-confirmation/confirm-dialog.service';

@Component({
  selector: 'app-edit-departement',
  templateUrl: './edit-departement.component.html',
  styleUrls: ['./edit-departement.component.css']
})
export class EditDepartementComponent implements OnInit {

 
  constructor(private confirmDialogService:ConfirmDialogService,private dialog: MatDialogRef<EditDepartementComponent, { data: any }>,
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

    this.confirmDialogService.confirm('Confirmation','Voulez-vous confirmer cette opération ?').subscribe((res) => {
      if (res){  
        if(this.departementDetail.valid){
          const data = this.departementDetail.getRawValue();
    
          this.dialog.close({
            data: data,
           
          });
        }        else this.departementDetail.markAllAsTouched()

        
     } })

     
  }


  handleClear(){
    this.departementDetail.reset();
  }

}
