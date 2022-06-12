import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Departement } from 'src/app/core/models/departement';
import { DepartementService } from 'src/app/core/services/departement.service';
import { GlobalConstants } from 'src/app/shared/constant/GlobalConstants';
import { AddDepartementComponent } from '../../departement/add-departement/add-departement.component';

@Component({
  selector: 'app-add-salle',
  templateUrl: './add-salle.component.html',
  styleUrls: ['./add-salle.component.css']
})
export class AddSalleComponent implements OnInit {


  departementList: Departement[] = [];
  departementobj: Departement = new Departement();
  
  constructor(private dialog: MatDialogRef<AddSalleComponent, { data: any }>,
    @Inject(MAT_DIALOG_DATA) data,
    private departementService: DepartementService
    ) { 
     
    }

  ngOnInit(): void {
    this.getDepartements();
  }
  salleDetail: FormGroup=new FormGroup({
    id: new FormControl(null),
    type: new FormControl(null,[Validators.required, Validators.pattern(GlobalConstants.nameRegex)]),
    nom: new FormControl(null,[Validators.required, Validators.pattern(GlobalConstants.nameRegex)]),
    nbposte: new FormControl(null,[Validators.required, Validators.pattern(GlobalConstants.numberRegex)]),
    pourcentagePres: new FormControl(null,[Validators.required, Validators.pattern(GlobalConstants.numberRegex)]),
    dep: new FormControl(null,[Validators.required]),
  });;
  getFormControl(key: string): FormControl {
    return this.salleDetail.controls[key] as FormControl;
  }
  getDepartements() {
    this.departementService.getDepartements().subscribe((res) => {
      this.departementList = res;
    });
  }
  onSuccessAdd() {

     if(this.salleDetail.valid && !this.validatePourcentage()){
      const data = this.salleDetail.getRawValue();

      this.dialog.close({
        data: data,
       
      });
    }    else this.salleDetail.markAllAsTouched()

  }
  handleClear(){
    this.salleDetail.reset();
  }

  validatePourcentage(){
    if(this.salleDetail.controls['pourcentagePres'].value > 100){
      return true;
    }
    else{
      return false;
    }
  }

}
