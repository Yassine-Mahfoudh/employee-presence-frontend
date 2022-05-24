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
  

    


  projetDetail!: FormGroup;
  projetobj: Projet = new Projet();
projetList:Projet[] = [];
  totalRec!: string;
  page:number=1

  constructor(private formBuilder2 : FormBuilder,
     private projetService: ProjetService,
     config: NgbModalConfig,
      private modalService: NgbModal,
      private dialog:MatDialog,

     ) {
        // customize default values of modals used by this component tree
 config.backdrop = 'static';
 config.keyboard = false;
      }

  ngOnInit(): void {
    this.getProjets();
    this.projetDetail = this.formBuilder2.group({
      id: [''],
      name:[null,[Validators.required,Validators.pattern(GlobalConstants.nameRegex),Validators.minLength(4)]],
      priority:[null,[Validators.required,Validators.pattern(GlobalConstants.numberRegex)]],
      description:[null,[Validators.required,Validators.minLength(5)]],
      startdate:[null,[Validators.required,Validators.pattern(GlobalConstants.dateRegex),Validators.minLength(10)]],
      enddate:[null,[Validators.required,Validators.pattern(GlobalConstants.dateRegex),Validators.minLength(10)]]
    });
  }


  
  open(content) {
    this.modalService.open(content);
  }

  close(content) {
    this.modalService.dismissAll(content);
  }

 

  addProjet(){

    console.log(this.projetDetail);
    this.projetobj.id=this.projetDetail.value.id;
    this.projetobj.name=this.projetDetail.value.name;
    this.projetobj.priority=this.projetDetail.value.priority;
    this.projetobj.description=this.projetDetail.value.description;
    this.projetobj.startdate=this.projetDetail.value.startdate;
    this.projetobj.enddate=this.projetDetail.value.enddate;
    console.log(this.projetobj);
    this.projetService.addProjet(this.projetobj).subscribe(res=>{
      console.log(res);
      this.getProjets();
    },
    (error: HttpErrorResponse) => {
      console.log(error.message);
    }
    );
}

getProjets(){
  this.projetService.getProjets().subscribe(res=>{
    this.projetList=res.sort();
  })
}

editProjet(projet : Projet){
  this.projetDetail.controls['id'].setValue(projet.id);
  this.projetDetail.controls['name'].setValue(projet.name);
  this.projetDetail.controls['priority'].setValue(projet.priority);
  this.projetDetail.controls['description'].setValue(projet.description);
  this.projetDetail.controls['startdate'].setValue(projet.startdate);
  this.projetDetail.controls['enddate'].setValue(projet.enddate);

}

deleteProjet(projet : Projet){

    this.projetService.deleteProjet(projet).subscribe(res=>{
      console.log(res);
      alert("projet deleted successfully");
      this.getProjets();
    },
    (error: HttpErrorResponse) => {
      alert(error.message);
    }
    );
  
  }

updateProjet(){
  this.projetobj.id=this.projetDetail.value.id;
  this.projetobj.name=this.projetDetail.value.name;
  this.projetobj.priority=this.projetDetail.value.priority;
  this.projetobj.description=this.projetDetail.value.description;
  this.projetobj.startdate=this.projetDetail.value.startdate;
  this.projetobj.enddate=this.projetDetail.value.enddate;
  this.projetService.updateProjet(this.projetobj).subscribe(res=>{
    console.log(res);
    this.getProjets();
  },
  (error: HttpErrorResponse) => {
    alert(error.message);
  }
  
  );

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
  if (results.length === 0 || !key) {
    this.getProjets();
  }
}


confirmDelete(projet: Projet) {
  if(confirm("Are you sure you want to delete projet "+projet.name)) {
     this.deleteProjet(projet);
  }
}

handleClear(){
  this.projetDetail.reset();
}

/*addProjectAction(){

  const dialogConfig = new MatDialogConfig();
  dialogConfig.width = "550px";
  this.dialog.open(AddprojectformComponent,dialogConfig)
}*/


}