import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { Departement } from 'src/app/core/models/departement';
import { DepartementService } from 'src/app/core/services/departement.service';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { GlobalConstants } from 'src/app/shared/constant/GlobalConstants';
import { ConfirmDialogService } from '../dialog-confirmation/confirm-dialog.service';
import { AddDepartementComponent } from './add-departement/add-departement.component';
import { MatDialog } from '@angular/material/dialog';
import { EditDepartementComponent } from './edit-departement/edit-departement.component';
import { data } from 'jquery';
export function isEmpty(val: any): boolean {
  return val === null || typeof val === 'undefined' || val.toString().trim() === '';
}
@Component({
  selector: 'app-departement',
  templateUrl: './departement.component.html',
  styleUrls: ['./departement.component.scss']
})

export class DepartementComponent implements OnInit {

  trashIcon = faTrash;
    editIcon = faPenToSquare;
    addIcon = faPlusCircle;


departementobj: Departement = new Departement();
departementup: Departement = new Departement();
  departementList:Departement[] = [];
  totalRec!: string;
  page:number=1

  constructor(private formBuilder : FormBuilder,config: NgbModalConfig,
    private confirmDialogService:ConfirmDialogService, private dialog: MatDialog,
    private modalService: NgbModal, private departementService: DepartementService) {
        // customize default values of modals used by this component tree
  config.backdrop = 'static';
  config.keyboard = false;
    }

  ngOnInit(): void {
    this.getDepartements();
   
  }

  departementDetail: FormGroup=new FormGroup({
    id: new FormControl(null),
    name: new FormControl(null,[Validators.required, Validators.pattern(GlobalConstants.nameRegex)]),
  });
  
  open(content) {
    this.modalService.open(content);
  }

  close(content) {
    this.modalService.dismissAll(content);
  }




  addDepartement(){
    const dialogRef = this.dialog.open(AddDepartementComponent, {
      disableClose: true,
     
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (!isEmpty(result)) {
        console.log("result:: ",result);

        this.departementService.addDepartement(result.data).subscribe(res=>{
          console.log(res);
          this.getDepartements();
        }
        );
      }
    });  



}

getDepartements(){
  this.departementService.getDepartements().subscribe(res=>{
    this.departementList=res;
  })
}

editDepartement(departement : Departement){
  this.departementDetail.controls['id'].setValue(departement.id);
  this.departementDetail.controls['name'].setValue(departement.name);
  this.departementDetail.controls['nbsalles'].setValue(departement.nbsalles);

}

deleteDepartement(departement : Departement){

    this.departementService.deleteDepartement(departement).subscribe(res=>{
      console.log(res);
      alert("profil deleted successfully");
      this.getDepartements();
    }
    );
  
  }


  updateDepartement(departement:Departement){
    const dialogRef = this.dialog.open(EditDepartementComponent, {
      disableClose: true,
     data:{
      departement:departement,
     }
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (!isEmpty(result)) {
        this.departementobj.id=this.departementDetail.value.id;
    this.departementobj.name=this.departementDetail.value.name;

    this.departementService.getDepartementById(this.departementDetail.value.id).subscribe((res) => {
      this.departementup = res;
      this.departementobj.nbsalles = this.departementup.nbsalles
      console.log("this.departementobj:::",this.departementobj);
  
    this.departementService.updateDepartement(this.departementobj).subscribe(res=>{
      console.log("update:::",res);
      this.getDepartements();

    });
    
  }
  );
      }
    });  
    

}

confirmDelete(departement: Departement){
  this.confirmDialogService.confirm('Confirmation','Voulez-vous confirmer cette opération ?').subscribe((res) => {
    if (res){  
      this.departementService.deleteDepartement(departement).subscribe(res=>{
        console.log(res);
        alert("user deleted successfully");
        this.getDepartements();
      }
      );
   } })
  
  
  }


public searchDepartements(key: string): void {
  console.log(key);
  const results: Departement[] = [];
  for (const departement of this.departementList) {
    if (departement.name.toLowerCase().indexOf(key.toLowerCase()) !== -1
    || departement.nbsalles.toString().indexOf(key.toLowerCase()) !== -1 ) {
      results.push(departement);
    }
  }
  this.departementList = results;
  if (key=='') {
    this.getDepartements();
  }
}


handleClear(){
  this.departementDetail.reset();
}

}
