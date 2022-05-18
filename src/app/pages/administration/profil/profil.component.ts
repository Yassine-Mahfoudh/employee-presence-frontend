import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { Profil } from 'src/app/core/models/profil';
import { ProfilService } from 'src/app/core/services/profil.service';

import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit {

  trashIcon = faTrash;
  editIcon = faPenToSquare;
  addIcon = faPlusCircle;


  profilDetail!: FormGroup;
  profilobj: Profil = new Profil();
  profilList:Profil[] = [];
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
      name:['']
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
    this.profilobj.name=this.profilDetail.value.name;
    this.profilService.addProfil(this.profilobj).subscribe(res=>{
      console.log(res);
      this.getProfils();
    }
    );


}

getProfils(){
  this.profilService.getProfils().subscribe(res=>{
    this.profilList=res;
  })
}

editProfil(profil : Profil){
  this.profilDetail.controls['id'].setValue(profil.id);
  this.profilDetail.controls['name'].setValue(profil.name);

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
  this.profilobj.name=this.profilDetail.value.name;
  this.profilService.updateProfil(this.profilobj).subscribe(res=>{
    console.log(res);
    this.getProfils();
  }
  );

}

confirmDelete(profil: Profil) {
  if(confirm("Are you sure you want to delete this profil : "+profil.name)) {
     this.deleteProfil(profil);
  }
}

public searchProfils(key: string): void {
  console.log(key);
  const results: Profil[] = [];
  for (const projet of this.profilList) {
    if (projet.name.toLowerCase().indexOf(key.toLowerCase()) !== -1
    || projet.description.toLowerCase().indexOf(key.toLowerCase()) !== -1
  ) {
      results.push(projet);
    }
  }
  this.profilList = results;
  if (results.length === 0 || !key) {
    this.getProfils();
  }
}


}