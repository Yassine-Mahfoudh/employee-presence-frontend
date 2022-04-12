import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { Profil } from 'src/app/core/models/profil';
import { ProfilService } from 'src/app/core/services/profil.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {

  profilDetail!: FormGroup;
  profilobj: Profil = new Profil();
  profiList:Profil[] = [];
  totalRec!: string;
  page:number=1

  constructor(private formBuilder : FormBuilder, private profilService: ProfilService,  config: NgbModalConfig,
    private modalService: NgbModal) {  
       // customize default values of modals used by this component tree
      config.backdrop = 'static';
      config.keyboard = false;}

  ngOnInit(): void {

    this.getProfils();
    this.profilDetail = this.formBuilder.group({
      id: [''],
      type:['']
    });
  }

  open(content) {
    this.modalService.open(content);
  }

  close(content) {
    this.modalService.dismissAll(content);
  }

  addProfil(){

    console.log(this.profilDetail);
    this.profilobj.id=this.profilDetail.value.id;
    this.profilobj.type=this.profilDetail.value.type;
    this.profilService.addProfil(this.profilobj).subscribe(res=>{
      console.log(res);
      this.getProfils();
    }
    );


}

getProfils(){
  this.profilService.getProfils().subscribe(res=>{
    this.profiList=res;
  })
}

editProfil(profil : Profil){
  this.profilDetail.controls['id'].setValue(profil.id);
  this.profilDetail.controls['type'].setValue(profil.type);

}

deleteProfil(profil : Profil){

    this.profilService.deleteProfil(profil).subscribe(res=>{
      console.log(res);
      alert("profil deleted successfully");
      this.getProfils();
    }
    );
  
  }

updateProfil(){
  this.profilobj.id=this.profilDetail.value.id;
  this.profilobj.type=this.profilDetail.value.type;
  this.profilService.updateProfil(this.profilobj).subscribe(res=>{
    console.log(res);
    this.getProfils();
  }
  );

}

confirmDelete(profil: Profil) {
  if(confirm("Are you sure you want to delete this profil : "+profil.type)) {
     this.deleteProfil(profil);
  }
}


}