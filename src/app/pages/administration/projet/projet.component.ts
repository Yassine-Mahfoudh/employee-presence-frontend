import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl,Validators, AbstractControl } from '@angular/forms';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Projet } from 'src/app/core/models/projet';
import { ProjetService } from 'src/app/core/services/projet.service';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { GlobalConstants } from 'src/app/shared/constant/GlobalConstants';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SortDirective } from 'src/app/shared/Utils/directive/sort.directive';
import { HttpErrorResponse } from '@angular/common/http';
import { AddProjetComponent } from './add-projet/add-projet.component';
import { EditProjetComponent } from './edit-projet/edit-projet.component';
import { ConfirmDialogService } from '../dialog-confirmation/confirm-dialog.service';
import { SnackbarService } from 'src/app/shared/service/snackbar.service';
export function isEmpty(val: any): boolean {
  return val === null || typeof val === 'undefined' || val.toString().trim() === '';
}

@Component({
  selector: 'app-projet',
  templateUrl: './projet.component.html',
  styleUrls: ['./projet.component.scss'],
  viewProviders: [SortDirective]
})
export class ProjetComponent implements OnInit {
    trashIcon = faTrash;
    editIcon = faPenToSquare;
    addIcon = faPlusCircle;


  
  projetobj: Projet = new Projet();
projetList:Projet[] = [];
  totalRec!: string;
  page:number=1

  constructor(private formBuilder2 : FormBuilder,
     private projetService: ProjetService,
     config: NgbModalConfig,
      private modalService: NgbModal,
      private dialog:MatDialog,
      private confirmDialogService:ConfirmDialogService,
      private snackbar:SnackbarService

     ) {
        // customize default values of modals used by this component tree
 config.backdrop = 'static';
 config.keyboard = false;
      }

  ngOnInit(): void {
    this.getProjets();
  
  }
  projetDetail: FormGroup=new FormGroup({
    id: new FormControl(null),
    name: new FormControl(null,[Validators.required]),
    description: new FormControl(null,[Validators.required]),
    priority: new FormControl(null,[Validators.required]),
    startdate: new FormControl(null,[Validators.required,]),
    enddate: new FormControl(null,[Validators.required, ]),
  });;
  validateDate(){
    if(this.projetDetail.controls['startdate'].value > this.projetDetail.controls['enddate'].value){
      return true;
    }
    else{
      return false;
    }
  }
  
  open(content) {
    this.modalService.open(content);
  }

  close(content) {
    this.modalService.dismissAll(content);
  }

 

  addProjet(){
    const dialogRef = this.dialog.open(AddProjetComponent, {
      disableClose: true,
  
    });

    dialogRef.afterClosed().subscribe((result) => {
     
      if (!isEmpty(result)) {

        console.log("result:",result);
        this.projetobj.id=result.data.id;
        this.projetobj.name=result.data.name;
        this.projetobj.priority=result.data.priority;
        this.projetobj.description=result.data.description;
        this.projetobj.startdate=result.data.startdate;
        this.projetobj.enddate=result.data.enddate;
        this.projetService.addProjet(this.projetobj).subscribe(res=>{
          this.snackbar.openSnackBar("Projet ajouté","")

          console.log(res);
          this.getProjets();
        }
        );
      }
    });  
    
}

getProjets(){
  this.projetService.getProjets().subscribe(res=>{
    this.projetList=res.sort();
  })
}

updateProjet(projet:Projet){
  const dialogRef = this.dialog.open(EditProjetComponent, {
    disableClose: true,
    data:{
projet: projet,
    }

  });
  dialogRef.afterClosed().subscribe((result) => {
    if (!isEmpty(result)) {
      this.projetobj.id=result.data.id;
        this.projetobj.name=result.data.name;
        this.projetobj.priority=result.data.priority;
        this.projetobj.description=result.data.description;
        this.projetobj.startdate=result.data.startdate;
        this.projetobj.enddate=result.data.enddate;
      this.projetService.updateProjet(this.projetobj).subscribe(res=>{
        this.snackbar.openSnackBar("Projet modifié","")
        console.log(res);
        this.getProjets();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
      
      );
    }
  });  

 

}
public searchProjects(key: string): void {
  console.log(key);
  const results: Projet[] = [];
  for (const projet of this.projetList) {
    if (projet.name.toLowerCase().indexOf(key.toLowerCase()) !== -1
    || projet.priority.toString().indexOf(key.toLowerCase()) !== -1
    || projet.description.toLowerCase().indexOf(key.toLowerCase()) !== -1
    || projet.startdate.toLowerCase().indexOf(key.toLowerCase()) !== -1
    || projet.enddate.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
      results.push(projet);
    }
  }
  this.projetList = results;
  if (key=='') {
    this.getProjets();
  }
}

confirmDelete(projet: Projet){
  this.confirmDialogService.confirm('Confirmation','Voulez-vous confirmer cette opération ?').subscribe((res) => {
    if (res){  
      this.projetService.deleteProjet(projet).subscribe(res=>{
        console.log(res);
        this.snackbar.openSnackBar("Projet supprimée","")
       this.getProjets();
      }
      );
   } })
  
  
  }


handleClear(){
  this.projetDetail.reset();
}




}