import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Salle } from 'src/app/core/models/salle';
import { SalleService } from 'src/app/core/services/salle.service';
import { DeleteComponent } from 'src/app/shared/constant/delete/delete.component';
@Component({
  selector: 'app-salle',
  templateUrl: './salle.component.html',
  styleUrls: ['./salle.component.scss']
})
export class SalleComponent implements OnInit {

  salleDetail!: FormGroup;
  salleobj: Salle = new Salle();
  salleList:Salle[] = [];
  totalRec!: string;
  page:number=1

  constructor(private formBuilder1 : FormBuilder,
     private salleService: SalleService,
     config: NgbModalConfig,
      private modalService: NgbModal,
      private dialog:MatDialog,

     ) {
        // customize default values of modals used by this component tree
 config.backdrop = 'static';
 config.keyboard = false;
      }

  ngOnInit(): void {
    this.getSalles();
    this.salleDetail = this.formBuilder1.group({
      id: [''],
      type:[''],
      num:[''],
      nbposte:[''],
      pourcentagePres:['']
    });
  }

  open(content) {
    this.modalService.open(content);
  }

  close(content) {
    this.modalService.dismissAll(content);
  }

 

  addSalle(){

    console.log(this.salleDetail);
    this.salleobj.id=this.salleDetail.value.id;
    this.salleobj.type=this.salleDetail.value.type;
    this.salleobj.num=this.salleDetail.value.num;
    this.salleobj.nbposte=this.salleDetail.value.nbposte;
    this.salleobj.pourcentagePres=this.salleDetail.value.pourcentagePres;
    this.salleService.addSalle(this.salleobj).subscribe(res=>{
      console.log(res);
      this.getSalles();
    }
    );


}

getSalles(){
  this.salleService.getSalles().subscribe(res=>{
    this.salleList=res;
  })
}

editSalle(salle : Salle){
  this.salleDetail.controls['id'].setValue(salle.id);
  this.salleDetail.controls['type'].setValue(salle.type);
  this.salleDetail.controls['num'].setValue(salle.num);
  this.salleDetail.controls['nbposte'].setValue(salle.nbposte);
  this.salleDetail.controls['pourcentagePres'].setValue(salle.pourcentagePres);

}

deleteSalle(salle : Salle){

    this.salleService.deleteSalle(salle).subscribe(res=>{
      console.log(res);
      alert("salle deleted successfully");
      this.getSalles();
    }
    );
  
  }

updateSalle(){
  this.salleobj.id=this.salleDetail.value.id;
  this.salleobj.type=this.salleDetail.value.type;
  this.salleobj.num=this.salleDetail.value.num;
  this.salleobj.nbposte=this.salleDetail.value.nbposte;
  this.salleobj.pourcentagePres=this.salleDetail.value.pourcentagePres;
  this.salleService.updateSalle(this.salleobj).subscribe(res=>{
    console.log(res);
    this.getSalles();
  }
  );

}

confirmDeleteS(salle: Salle) {
  if(confirm("Are you sure you want to delete salle "+salle.type+" number : "+salle.num)) {
     this.deleteSalle(salle);
  }
}
/*ConfirmDelete(){

  const dialogConfig = new MatDialogConfig();
  dialogConfig.width = "550px";
  this.dialog.open(DeleteComponent,dialogConfig)
}
*/
}
