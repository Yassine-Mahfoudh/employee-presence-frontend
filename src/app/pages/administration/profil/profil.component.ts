import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { Profil } from 'src/app/core/models/profil';
import { ProfilService } from 'src/app/core/services/profil.service';

import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { GlobalConstants } from 'src/app/shared/constant/GlobalConstants';
import { EditProfilComponent } from './edit-profil/edit-profil.component';
import { MatDialog } from '@angular/material/dialog';
export function isEmpty(val: any): boolean {
  return val === null || typeof val === 'undefined' || val.toString().trim() === '';
}
@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit {

  trashIcon = faTrash;
  editIcon = faPenToSquare;
  addIcon = faPlusCircle;

  profilobj: Profil = new Profil();
  profilList:Profil[] = [];
  totalRec!: string;
  page:number=1

  constructor(private formBuilder : FormBuilder, private profilService: ProfilService,  config: NgbModalConfig,
    private modalService: NgbModal,private dialog: MatDialog,) {  
       // customize default values of modals used by this component tree
      config.backdrop = 'static';
      config.keyboard = false;}

  ngOnInit(): void {

    this.getProfils();
  }

 profilDetail:FormGroup=new FormGroup({
    id: new FormControl(null),
    name:new FormControl(null),
    description: new FormControl(null,[Validators.required, Validators.pattern(GlobalConstants.nameRegex)]),
  });

  
  open(content) {
    this.modalService.open(content);
  }

  close(content) {
    this.modalService.dismissAll(content);
  }

//   addProfil(){

//     console.log(this.profilDetail);
//     this.profilobj.id=this.profilDetail.value.id;
//     this.profilobj.name=this.profilDetail.value.name;
//     this.profilService.addProfil(this.profilobj).subscribe(res=>{
//       console.log(res);
//       this.getProfils();
//     }
//     );


// }

getProfils(){
  this.profilService.getProfils().subscribe(res=>{
    this.profilList=res;
  })
}

// editProfil(profil : Profil){
//   this.profilDetail.controls['id'].setValue(profil.id);
//   this.profilDetail.controls['name'].setValue(profil.name);

// }

deleteProfil(profil : Profil){

    this.profilService.deleteProfil(profil).subscribe(res=>{
      console.log(res);
      alert("profil deleted successfully");
      this.getProfils();
    }
    );
  
  }

updateProfil(profil:Profil){
  const dialogRef = this.dialog.open(EditProfilComponent, {
    disableClose: true,
   data:{
    profil:profil,
   }
  });

  dialogRef.afterClosed().subscribe((result) => {
    if (!isEmpty(result)) {
     this.profilobj.id=result.data.id;
      this.profilobj.description=result.data.description;
      this.profilService.updateProfil(this.profilobj).subscribe(res=>{
        console.log(res);
        this.getProfils();
      }
      );
    
    }
  });  
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
  if (key=='') {
    this.getProfils();
  }

}

}