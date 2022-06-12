import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GlobalConstants } from 'src/app/shared/constant/GlobalConstants';
import { ConfirmDialogService } from '../../dialog-confirmation/confirm-dialog.service';
import { AddProjetComponent } from '../add-projet/add-projet.component';

@Component({
  selector: 'app-edit-projet',
  templateUrl: './edit-projet.component.html',
  styleUrls: ['./edit-projet.component.css']
})
export class EditProjetComponent implements OnInit {
  


  constructor( private confirmDialogService:ConfirmDialogService,   private dialog: MatDialogRef<EditProjetComponent, { data: any }>,
    @Inject(MAT_DIALOG_DATA) data,) { 
      this.projetDetail=new FormGroup({
        id: new FormControl(data.projet.id),
        name: new FormControl(data.projet.name,[Validators.required, Validators.pattern(GlobalConstants.nameRegex)]),
        description: new FormControl(data.projet.description,[Validators.required, Validators.pattern(GlobalConstants.nameRegex)]),
        priority: new FormControl(data.projet.priority,[Validators.required, Validators.pattern(GlobalConstants.numberRegex)]),
        startdate: new FormControl(data.projet.startdate,[Validators.required, Validators.minLength(10)]),
        enddate: new FormControl(data.projet.enddate,[Validators.required, Validators.minLength(10)]),
      });
    }

  ngOnInit(): void {
  }

  projetDetail:FormGroup;

  getFormControl(key: string): FormControl {
    return this.projetDetail.controls[key] as FormControl;
  }
  onSuccessAdd() {

    this.confirmDialogService.confirm('Confirmation','Voulez-vous confirmer cette opération ?').subscribe((res) => {
      if (res){  
        if(this.projetDetail.valid && !this.validateDate()){
          const data = this.projetDetail.getRawValue();

          this.dialog.close({
            data: data,
          });
          
        }else this.projetDetail.markAllAsTouched()
        
     } })
     
  }
  handleClear(){
    this.projetDetail.reset();
  }

  validateDate(){
    if(this.projetDetail.controls['startdate'].value > this.projetDetail.controls['enddate'].value){
      return true;
    }
    else{
      return false;
    }
  }
  

}
