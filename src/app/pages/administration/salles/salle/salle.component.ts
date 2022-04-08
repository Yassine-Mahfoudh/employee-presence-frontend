import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SalleService } from 'src/app/core/services/salle.service';

@Component({
  selector: 'app-salle',
  templateUrl: './salle.component.html',
  styleUrls: ['./salle.component.css']
})
export class SalleComponent implements OnInit {

  public salleForm: FormGroup;

  constructor(private formBuilder:FormBuilder,
    private dialogRef : MatDialogRef<SalleComponent>,
    private salleService:SalleService,
    @Inject(MAT_DIALOG_DATA) public data : any) { }


    onNoClick(): void {
      this.dialogRef.close();
     }

  ngOnInit() {
    this.salleForm = this.formBuilder.group({
      id: [this.data.id],
      type: [ this.data.type, [Validators.required]],
      num: [ this.data.num, [Validators.required]],
      nbposte: [ this.data.nbposte, [Validators.required]],
      pourcentagePres: [ this.data.pourcentagePres , [Validators.required]],
    });
  }
  

  onSubmit() {
    if (isNaN(this.data.id)) {
      this.salleService.addSalle(this.salleForm.value);
      this.dialogRef.close();
    } else {
      this.salleService.updateSalle(this.salleForm.value);
      this.dialogRef.close();
    }
  }
}
