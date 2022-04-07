import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Salle } from 'src/app/models/salle';
import { SalleService } from 'src/app/services/salle.service';

@Component({
  selector: 'app-edit-salle',
  templateUrl: './edit-salle.component.html',
  styleUrls: ['./edit-salle.component.css']
})
export class EditSalleComponent implements OnInit {
  ngOnInit() {}

 /* selectedSalle : Salle;
  editForm : FormGroup;
  isLoading = false;

  constructor(public modal: NgbActiveModal,
     private route: ActivatedRoute,
     private salleService : SalleService,
     private formBuilder: FormBuilder,
     private router: Router
    ) { }

  ngOnInit() {

    const salleId = this.route.snapshot.params['id'];
    this.setForm(salleId);
  }

  onSubmit() {
    if (this.editForm.invalid || this.isLoading) {
      return;
    }
    this.isLoading = true;
    this.salleService.update(this.editForm.value).subscribe(x => {
      this.isLoading = false;
      this.modal.close('Yes');
    },
      error => {
        this.isLoading = false;
      });
  }

  get editFormData() { return this.editForm.controls; }

  private setForm(salleId: number) {
    this.salleService.getSalleById(salleId).subscribe(x => {
      this.selectedSalle = x;

    this.editForm = this.formBuilder.group({
      id: [this.selectedSalle.id],
      type : [this.selectedSalle.type, Validators.required],
      num : [this.selectedSalle.num, Validators.required],
      nbposte : [{ value: this.selectedSalle.nbposte, disabled: true }, [ Validators.required]],
      pourcentagePres: [this.selectedSalle.pourcentagePres, Validators.required]
    });
  });

  }*/
}
