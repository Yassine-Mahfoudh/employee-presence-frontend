import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Demande } from 'src/app/core/models/demande';
import { DemandeService } from 'src/app/core/services/demande.service';
import { UserService } from 'src/app/core/services/user.service';
import { GlobalConstants } from 'src/app/shared/constant/GlobalConstants';

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
     public userService:UserService,
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
      title:[null,[Validators.required, Validators.pattern(GlobalConstants.nameRegex),Validators.minLength(4)]],
      description:[''],
      datedebut: [''],
      datefin: [''],
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
    this.demandeobj.title=this.demandeDetail.value.title;
    this.demandeobj.description=this.demandeDetail.value.description;
    this.demandeobj.datedebut=this.demandeDetail.value.datedebut;
    this.demandeobj.datefin=this.demandeDetail.value.datefin;
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
  this.demandeDetail.controls['title'].setValue(demande.title);
  this.demandeDetail.controls['description'].setValue(demande.description);
  this.demandeDetail.controls['datedebut'].setValue(demande.datedebut);
  this.demandeDetail.controls['datefin'].setValue(demande.datefin);

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
  this.demandeobj.title=this.demandeDetail.value.title;
  this.demandeobj.description=this.demandeDetail.value.description;
  this.demandeobj.datedebut=this.demandeDetail.value.datedebut;
  this.demandeobj.datefin=this.demandeDetail.value.datefin;
  this.demandeService.updateDemande(this.demandeobj).subscribe(res=>{
    console.log(res);
    this.getDemandes();
  }
  );

}

confirmDelete(demande: Demande) {
  if(confirm("Are you sure you want to delete demande: "+demande.title)) {
     this.deleteDemande(demande);
  }
}

}
