import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Salle } from 'src/app/core/models/salle';
import { SalleService } from 'src/app/core/services/salle.service';
import { DeleteComponent } from 'src/app/shared/constant/delete/delete.component';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { GlobalConstants } from 'src/app/shared/constant/GlobalConstants';
import { Departement } from 'src/app/core/models/departement';
import { DepartementService } from 'src/app/core/services/departement.service';
@Component({
  selector: 'app-salle',
  templateUrl: './salle.component.html',
  styleUrls: ['./salle.component.scss'],
})
export class SalleComponent implements OnInit {
  trashIcon = faTrash;
  editIcon = faPenToSquare;
  addIcon = faPlusCircle;

  salleDetail!: FormGroup;
  salleobj: Salle = new Salle();
  departementobj: Departement = new Departement();
  salleList: Salle[] = [];
  departementList: Departement[] = [];
  totalRec!: string;
  page: number = 1;
ancienDep:any;
  constructor(
    private formBuilder1: FormBuilder,
    private salleService: SalleService,
    config: NgbModalConfig,
    private modalService: NgbModal,
    private dialog: MatDialog,
    private departementService: DepartementService
  ) {
    // customize default values of modals used by this component tree
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {
    this.getDepartements();
    this.getSalles();
    this.salleDetail = this.formBuilder1.group({
      id: [''],
      type: [''],
      num: [
        null,
        [Validators.required, Validators.pattern(GlobalConstants.numberRegex)],
      ],
      nbposte: [
        null,
        [Validators.required, Validators.pattern(GlobalConstants.numberRegex)],
      ],
      pourcentagePres: [
        null,
        [Validators.required, Validators.pattern(GlobalConstants.numberRegex)],
      ],
      dep: [''],
    });
  }

  open(content) {
    this.modalService.open(content);
  }

  close(content) {
    this.modalService.dismissAll(content);
  }

  increaseDepartementNbsalles(x: any) {
    this.departementService.getDepartementByName(x).subscribe((res) => {
      console.log(res);
      this.departementobj = res;
      this.departementobj.nbsalles = this.departementobj.nbsalles + 1;
      this.departementService
        .updateDepartement(this.departementobj)
        .subscribe((res) => {
          console.log(res);
        });
    });
  }

  decreaseDepartementNbsalles(x: any) {
    this.departementService.getDepartementByName(x).subscribe((res) => {
      console.log(res);
      this.departementobj = res;
      this.departementobj.nbsalles = this.departementobj.nbsalles + -1;
      this.departementService
        .updateDepartement(this.departementobj)
        .subscribe((res) => {
          console.log(res);
        });
    });
  }

  addSalle() {
    console.log(this.salleDetail);
    this.salleobj.id = this.salleDetail.value.id;
    this.salleobj.type = this.salleDetail.value.type;
    this.salleobj.num = this.salleDetail.value.num;
    this.salleobj.nbposte = this.salleDetail.value.nbposte;
    this.salleobj.pourcentagePres = this.salleDetail.value.pourcentagePres;
    this.salleobj.dep = this.salleDetail.value.dep;


    this.salleService.addSalle(this.salleobj).subscribe((res) => {
      console.log(res);
      this.increaseDepartementNbsalles(this.salleobj.dep);
      this.getSalles();
    });
  }

  getDepartements() {
    this.departementService.getDepartements().subscribe((res) => {
      this.departementList = res;
    });
  }

  getSalles() {
    this.salleService.getSalles().subscribe((res) => {
      this.salleList = res;
    });
  }

  editSalle(salle: Salle) {
    this.salleDetail.controls['id'].setValue(salle.id);
    this.salleDetail.controls['type'].setValue(salle.type);
    this.salleDetail.controls['num'].setValue(salle.num);
    this.salleDetail.controls['nbposte'].setValue(salle.nbposte);
    this.salleDetail.controls['pourcentagePres'].setValue(
      salle.pourcentagePres
    );
    this.salleDetail.controls['dep'].setValue(salle.dep);
    this.ancienDep=salle.dep;
  }

  updateSalle() {
    this.salleobj.id = this.salleDetail.value.id;
    this.salleobj.type = this.salleDetail.value.type;
    this.salleobj.num = this.salleDetail.value.num;
    this.salleobj.nbposte = this.salleDetail.value.nbposte;
    this.salleobj.pourcentagePres = this.salleDetail.value.pourcentagePres;
    this.salleobj.dep = this.salleDetail.value.dep;
    this.salleService.updateSalle(this.salleobj).subscribe((res) => {
      console.log(res);
      this.decreaseDepartementNbsalles(this.ancienDep);
      this.increaseDepartementNbsalles(this.salleobj.dep);
      this.getSalles();
    });
  }

  deleteSalle(salle: Salle) {
    this.salleService.deleteSalle(salle).subscribe((res) => {
      console.log(res);
      alert('salle deleted successfully');
      this.getSalles();
      this.decreaseDepartementNbsalles(salle.dep)
    });
  }

  

  confirmDelete(salle: Salle) {
    if (
      confirm(
        'Are you sure you want to delete salle ' +
          salle.type +
          ' number : ' +
          salle.num
      )
    ) {
      this.deleteSalle(salle);
    }
  }
  /*ConfirmDelete(){

  const dialogConfig = new MatDialogConfig();
  dialogConfig.width = "550px";
  this.dialog.open(DeleteComponent,dialogConfig)
}
*/

  public searchSalles(key: string): void {
    console.log(key);
    const results: Salle[] = [];
    for (const salle of this.salleList) {
      if (
        salle.type.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
        salle.num.toString().indexOf(key.toLowerCase()) !== -1 ||
        salle.nbposte.toString().indexOf(key.toLowerCase()) !== -1 ||
        salle.pourcentagePres.toString().indexOf(key.toLowerCase()) !== -1 ||
        salle.dep.toLowerCase().indexOf(key.toLowerCase()) !== -1
      ) {
        results.push(salle);
      }
    }
    this.salleList = results;
    if (results.length === 0 || !key) {
      this.getSalles();
    }
  }

  handleClear() {
    this.salleDetail.reset();
  }
}
