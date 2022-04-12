import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Demande } from 'src/app/core/models/demande';
import { DemandeService } from 'src/app/core/services/demande.service';

@Component({
  selector: 'app-demande',
  templateUrl: './demande.component.html',
  styleUrls: ['./demande.component.css']
})
export class DemandeComponent implements OnInit {

  demandeDetail!: FormGroup;
  demandeobj: Demande = new Demande();
  demandeList:Demande[] = [];
  totalRec!: string;
  page:number=1

  constructor(private formBuilder : FormBuilder,
     private demandeService: DemandeService,
     config: NgbModalConfig,
      private modalService: NgbModal
     ) {
        // customize default values of modals used by this component tree
 config.backdrop = 'static';
 config.keyboard = false;
      }

  ngOnInit(): void {
    this.getDemandes();
    this.demandeDetail = this.formBuilder.group({
      id: [''],
      name:[''],
      motive:[''],
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

 

  addDemande(){

    console.log(this.demandeDetail);
    this.demandeobj.id=this.demandeDetail.value.id;
    this.demandeobj.name=this.demandeDetail.value.name;
    this.demandeobj.motive=this.demandeDetail.value.motive;
    this.demandeobj.startdate=this.demandeDetail.value.startdate;
    this.demandeobj.enddate=this.demandeDetail.value.enddate;
    this.demandeService.addDemande(this.demandeobj).subscribe(res=>{
      console.log(res);
      this.getDemandes();
    }
    );


}

getDemandes(){
  this.demandeService.getDemandes().subscribe(res=>{
    this.demandeList=res;
  })
}

editDemande(demande : Demande){
  this.demandeDetail.controls['id'].setValue(demande.id);
  this.demandeDetail.controls['name'].setValue(demande.name);
  this.demandeDetail.controls['motive'].setValue(demande.motive);
  this.demandeDetail.controls['startdate'].setValue(demande.startdate);
  this.demandeDetail.controls['enddate'].setValue(demande.enddate);

}

deleteDemande(demande : Demande){

    this.demandeService.deleteDemande(demande).subscribe(res=>{
      console.log(res);
      alert("demande deleted successfully");
      this.getDemandes();
    }
    );
  
  }

updateDemande(){
  this.demandeobj.id=this.demandeDetail.value.id;
  this.demandeobj.name=this.demandeDetail.value.name;
  this.demandeobj.motive=this.demandeDetail.value.motive;
  this.demandeobj.startdate=this.demandeDetail.value.startdate;
  this.demandeobj.enddate=this.demandeDetail.value.enddate;
  this.demandeService.updateDemande(this.demandeobj).subscribe(res=>{
    console.log(res);
    this.getDemandes();
  }
  );

}

confirmDelete(demande: Demande) {
  if(confirm("Are you sure you want to delete demande "+demande.name)) {
     this.deleteDemande(demande);
  }
}

}
