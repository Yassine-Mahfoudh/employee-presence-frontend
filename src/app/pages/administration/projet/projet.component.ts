import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Projet } from 'src/app/core/models/projet';
import { ProjetService } from 'src/app/core/services/projet.service';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-projet',
  templateUrl: './projet.component.html',
  styleUrls: ['./projet.component.scss']
})
export class ProjetComponent implements OnInit {
    trashIcon = faTrash;
    editIcon = faPenToSquare;
    addIcon = faPlusCircle;

    


  projetDetail!: FormGroup;
  projetDetail2!: FormGroup;
  projetobj: Projet = new Projet();
projetList:Projet[] = [];
  totalRec!: string;
  page:number=1

  constructor(private formBuilder2 : FormBuilder,
     private projetService: ProjetService,
     config: NgbModalConfig,
      private modalService: NgbModal
     ) {
        // customize default values of modals used by this component tree
 config.backdrop = 'static';
 config.keyboard = false;
      }

  ngOnInit(): void {
    this.getProjets();
    this.projetDetail = this.formBuilder2.group({
      id: [''],
      name:[''],
      priority:[''],
      description:[''],
      startdate:[''],
      enddate:['']
    });
    this.projetDetail2 = this.formBuilder2.group({
      id: [''],
      name:[''],
      priority:[''],
      description:[''],
      startdate:[''],
      enddate:['']
    });
  }

  open(content) {
    this.modalService.open(content);
  }

  close(content) {
    this.modalService.dismissAll(content);
  }

 

  addProjet(){

    console.log(this.projetDetail2);
    this.projetobj.id=this.projetDetail2.value.id;
    this.projetobj.name=this.projetDetail2.value.name;
    this.projetobj.priority=this.projetDetail2.value.priority;
    this.projetobj.description=this.projetDetail2.value.description;
    this.projetobj.startdate=this.projetDetail2.value.startdate;
    this.projetobj.enddate=this.projetDetail2.value.enddate;
    this.projetService.addProjet(this.projetobj).subscribe(res=>{
      console.log(res);
      this.getProjets();
      this.projetDetail2=null;
    }
    );


}

getProjets(){
  this.projetService.getProjets().subscribe(res=>{
    this.projetList=res;
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
  }
  );

}

confirmDelete(projet: Projet) {
  if(confirm("Are you sure you want to delete projet "+projet.name)) {
     this.deleteProjet(projet);
  }
}

}