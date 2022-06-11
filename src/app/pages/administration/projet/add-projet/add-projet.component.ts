import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GlobalConstants } from 'src/app/shared/constant/GlobalConstants';
import { AddSalleComponent } from '../../salle/add-salle/add-salle.component';

@Component({
  selector: 'app-add-projet',
  templateUrl: './add-projet.component.html',
  styleUrls: ['./add-projet.component.css']
})
export class AddProjetComponent implements OnInit {



  constructor(    private dialog: MatDialogRef<AddProjetComponent, { data: any }>,
    @Inject(MAT_DIALOG_DATA) data,) { }

  ngOnInit(): void {
  }
  projetDetail: FormGroup=new FormGroup({
    id: new FormControl(null),
    name: new FormControl(null,[Validators.required]),
    description: new FormControl(null,[Validators.required]),
    priority: new FormControl(null,[Validators.required]),
    startdate: new FormControl(null,[Validators.required]),
    enddate: new FormControl(null,[Validators.required]),
  });;


  getFormControl(key: string): FormControl {
    return this.projetDetail.controls[key] as FormControl;
  }
  onSuccessAdd() {

     if(this.projetDetail.valid){
      const data = this.projetDetail.getRawValue();
console.log("data :::: ",data)
      this.dialog.close({
        data: data,
       
      });
    }
    else {
      console.log("invalide")
    }
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
