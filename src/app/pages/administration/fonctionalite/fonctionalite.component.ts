import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Fonctionalite } from 'src/app/core/models/fonctionalite';
import { FonctionaliteService } from 'src/app/core/services/fonctionalite.service';

@Component({
  selector: 'app-fonctionalite',
  templateUrl: './fonctionalite.component.html',
  styleUrls: ['./fonctionalite.component.css']
})
export class FonctionaliteComponent implements OnInit {

  fonctionaliteDetail!: FormGroup;
  fonctionaliteobj: Fonctionalite = new Fonctionalite();
  fonctionaliteList:Fonctionalite[] = [];
  totalRec!: string;
  page:number=1

  constructor(private formBuilder : FormBuilder,
     private fonctionaliteService: FonctionaliteService,
     config: NgbModalConfig,
      private modalService: NgbModal
     ) {
        // customize default values of modals used by this component tree
 config.backdrop = 'static';
 config.keyboard = false;
      }

  ngOnInit(): void {
    this.getFonctionalites();
    this.fonctionaliteDetail = this.formBuilder.group({
      id: [''],
      nom:[''],
      designation:['']
    });
  }

  open(content) {
    this.modalService.open(content);
  }

  close(content) {
    this.modalService.dismissAll(content);
  }

 

  addFonctionalite(){

    console.log(this.fonctionaliteDetail);
    this.fonctionaliteobj.id=this.fonctionaliteDetail.value.id;
    this.fonctionaliteobj.nom=this.fonctionaliteDetail.value.nom;
    this.fonctionaliteobj.designation=this.fonctionaliteDetail.value.designation;
    this.fonctionaliteService.addFonctionalite(this.fonctionaliteobj).subscribe(res=>{
      console.log(res);
      this.getFonctionalites();
    }
    );


}

getFonctionalites(){
  this.fonctionaliteService.getFonctionalites().subscribe(res=>{
    this.fonctionaliteList=res;
  })
}

editFonctionalite(fonctionalite : Fonctionalite){
  this.fonctionaliteDetail.controls['id'].setValue(fonctionalite.id);
  this.fonctionaliteDetail.controls['nom'].setValue(fonctionalite.nom);
  this.fonctionaliteDetail.controls['designation'].setValue(fonctionalite.designation);
 

}

deleteFonctionalite(fonctionalite : Fonctionalite){

    this.fonctionaliteService.deleteFonctionalite(fonctionalite).subscribe(res=>{
      console.log(res);
      alert(" fonctionalite deleted successfully");
      this.getFonctionalites();
    }
    );
  
  }

  updateFonctionalite(){
  this.fonctionaliteobj.id=this.fonctionaliteDetail.value.id;
  this.fonctionaliteobj.nom=this.fonctionaliteDetail.value.nom;
  this.fonctionaliteobj.designation=this.fonctionaliteDetail.value.designation;
  this.fonctionaliteService.updateFonctionalite(this.fonctionaliteobj).subscribe(res=>{
    console.log(res);
    this.getFonctionalites();}
  )

}

confirmDelete(fonctionalite: Fonctionalite) {
  if(confirm("Are you sure you want to delete demande "+fonctionalite.nom)) {
     this.deleteFonctionalite(fonctionalite);
  }
}

}
