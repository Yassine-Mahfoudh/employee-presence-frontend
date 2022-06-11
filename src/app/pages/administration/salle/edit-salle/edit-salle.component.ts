import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Departement } from 'src/app/core/models/departement';
import { DepartementService } from 'src/app/core/services/departement.service';
import { GlobalConstants } from 'src/app/shared/constant/GlobalConstants';

@Component({
  selector: 'app-edit-salle',
  templateUrl: './edit-salle.component.html',
  styleUrls: ['./edit-salle.component.css']
})
export class EditSalleComponent implements OnInit {

  departementList: Departement[] = [];
  departementobj: Departement = new Departement();
 
  constructor(private dialog: MatDialogRef<EditSalleComponent, { data: any }>,
    @Inject(MAT_DIALOG_DATA) data,
    private departementService:DepartementService) {
      console.log('data ::: ', data)
      this.salleDetail=new FormGroup({
        id: new FormControl(data.salle.id),
        type: new FormControl(data.salle.type,[Validators.required, Validators.pattern(GlobalConstants.nameRegex)]),
        nom: new FormControl(data.salle.nom,[Validators.required, Validators.pattern(GlobalConstants.nameRegex)]),
        nbposte: new FormControl(data.salle.nbposte,[Validators.required, Validators.pattern(GlobalConstants.numberRegex)]),
        pourcentagePres: new FormControl(data.salle.pourcentagePres,[Validators.required, Validators.pattern(GlobalConstants.numberRegex)]),
        dep: new FormControl(data.salle.dep,[Validators.required]),
      });
    }

  ngOnInit(): void {
    this.getDepartements();
  }
  salleDetail: FormGroup
  getFormControl(key: string): FormControl {
    return this.salleDetail.controls[key] as FormControl;
  }
  getDepartements() {
    this.departementService.getDepartements().subscribe((res) => {
      this.departementList = res;
    });
  }
  onSuccessAdd() {
    
     if(this.salleDetail.valid){
      const data = this.salleDetail.getRawValue();
  
      this.dialog.close({
        data: data,
       
      });
    }
  }
  handleClear(){
    this.salleDetail.reset();
  }

}
