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
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { GlobalConstants } from 'src/app/shared/constant/GlobalConstants';
import { Departement } from 'src/app/core/models/departement';
import { DepartementService } from 'src/app/core/services/departement.service';
import { AddSalleComponent } from './add-salle/add-salle.component';
import { EditSalleComponent } from './edit-salle/edit-salle.component';
import { ConfirmDialogService } from '../dialog-confirmation/confirm-dialog.service';
import { SnackbarService } from 'src/app/shared/service/snackbar.service';
export function isEmpty(val: any): boolean {
  return val === null || typeof val === 'undefined' || val.toString().trim() === '';
}
@Component({
  selector: 'app-salle',
  templateUrl: './salle.component.html',
  styleUrls: ['./salle.component.scss'],
})
export class SalleComponent implements OnInit {
  trashIcon = faTrash;
  editIcon = faPenToSquare;
  addIcon = faPlusCircle;


  salleDetail: FormGroup=new FormGroup({
    id: new FormControl(null),
    type: new FormControl(null,[Validators.required, Validators.pattern(GlobalConstants.nameRegex)]),
    nom: new FormControl(null,[Validators.required, Validators.pattern(GlobalConstants.nameRegex)]),
    nbposte: new FormControl(null,[Validators.required, Validators.pattern(GlobalConstants.numberRegex)]),
    pourcentagePres: new FormControl(null,[Validators.required, Validators.pattern(GlobalConstants.numberRegex)]),
    dep: new FormControl(null,[Validators.required, Validators.pattern(GlobalConstants.numberRegex)]),
  });

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
    private confirmDialogService:ConfirmDialogService,
    private dialog: MatDialog,
    private departementService: DepartementService,
    private snackbar:SnackbarService
  ) {
    // customize default values of modals used by this component tree
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {
    this.getDepartements();
    this.getSalles();
    
  }

  open(content) {
    this.modalService.open(content);
  }

  close(content) {
    this.modalService.dismissAll(content);
  }

  increaseDepartementNbsalles(x: any) {
    this.departementService.getDepartementByName(x).subscribe((res) => {

      this.departementobj = res;
      this.departementobj.nbsalles = this.departementobj.nbsalles + 1;


      this.departementService.updateDepartement(this.departementobj).subscribe((res) => {         

        this.getDepartements()
        });
    });
  }

  decreaseDepartementNbsalles(x: any) {
    this.departementService.getDepartementByName(x).subscribe((res) => {
   
      this.departementobj = res;
      this.departementobj.nbsalles = this.departementobj.nbsalles -1;
      this.departementService.updateDepartement(this.departementobj).subscribe((res) => {
          console.log(res);
          this.getDepartements()
        });
    });
  }

  addSalle() {

    const dialogRef = this.dialog.open(AddSalleComponent, {
      disableClose: true,
  
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (!isEmpty(result)) {    
        this.salleobj.id = result.data.id;
        this.salleobj.type =result.data.type;
        this.salleobj.nom = result.data.nom;
        this.salleobj.nbposte = result.data.nbposte;
        this.salleobj.pourcentagePres = result.data.pourcentagePres;
        this.salleobj.dep = result.data.dep;
      
      
        this.increaseDepartementNbsalles(this.salleobj.dep);
        this.salleService.addSalle(this.salleobj).subscribe(res => {
          this.snackbar.openSnackBar("Nouvelle salle ajoutée","")
          console.log(res);
        
          this.getSalles();
        });
      }
    });  
    
  }

  getDepartements() {
    this.departementService.getDepartements().subscribe((res) => {
      this.departementList = res;
      console.log("listDep::", this.departementList)
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
    this.salleDetail.controls['nom'].setValue(salle.nom);
    this.salleDetail.controls['nbposte'].setValue(salle.nbposte);
    this.salleDetail.controls['pourcentagePres'].setValue(
      salle.pourcentagePres
    );
    this.salleDetail.controls['dep'].setValue(salle.dep);
    this.ancienDep=salle.dep;
  }

  updateSalle(salle:Salle) {
  

    const dialogRef = this.dialog.open(EditSalleComponent, {
      disableClose: true,

      data:{
        salle:salle,
      },
 
    });dialogRef.afterClosed().subscribe((result) => {
      if (!isEmpty(result)) {
     console.log("result :::",result.data)
        this.salleobj.id = result.data.id;
        this.salleobj.type =result.data.type;
        this.salleobj.nom = result.data.nom;
        this.salleobj.nbposte = result.data.nbposte;
        this.salleobj.pourcentagePres = result.data.pourcentagePres;
        console.log("  this.salleobj.dep avant affectation :: ",  this.salleobj.dep)

        this.salleobj.dep = result.data.dep;
    console.log("  this.salleobj.dep apres affectation :: ",  this.salleobj.dep)

    console.log("  result.data.dep :: ",  result.data.dep)

        this.decreaseDepartementNbsalles(result.data.dep);
        

        
        
         
        this.salleService.updateSalle(this.salleobj).subscribe((res) => {
          this.snackbar.openSnackBar("Salle modifiée","")
         // console.log(res);
         // console.log("  this.salleobj.dep 2:: ",  this.salleobj.dep)
          this.increaseDepartementNbsalles(this.salleobj.dep);
          this.getSalles();
        });
      }
    });  
    
  }

 /* deleteSalle(salle: Salle) {
    this.salleService.deleteSalle(salle).subscribe((res) => {
      console.log(res);
      this.snackbar.openSnackBar("Salle suprimée","")
      this.getSalles();
      this.decreaseDepartementNbsalles(salle.dep)
    });
  }*/

  
  confirmDelete(salle: Salle){
    this.confirmDialogService.confirm('Confirmation','Voulez-vous confirmer cette opération ?').subscribe((res) => {
      if (res){  
        this.salleService.deleteSalle(salle).subscribe(res=>{
          this.decreaseDepartementNbsalles(salle.dep)
          console.log(res);
          this.snackbar.openSnackBar("Salle suprimée","")
          this.getDepartements();
        }
        );
     } })
    
    
    }

  

  public searchSalles(key: string): void {
    console.log(key);
    const results: Salle[] = [];
    for (const salle of this.salleList) {
      if (
        salle.nom.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || salle.type.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || salle.nbposte.toString().toLowerCase().indexOf(key.toLowerCase()) !== -1
      || salle.pourcentagePres.toString().toLowerCase().indexOf(key.toLowerCase()) !== -1
      || salle.dep.toString().toLowerCase().indexOf(key.toLowerCase()) !== -1
      
      ) {
        results.push(salle);
      }
    }
    this.salleList = results;
    if (key=='') {
      this.getSalles();
    }
  }

  handleClear() {
    this.salleDetail.reset();
  }
}
