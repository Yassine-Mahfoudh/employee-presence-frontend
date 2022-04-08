import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Salle } from 'src/app/core/models/salle';
import { SalleService } from 'src/app/core/services/salle.service';

@Component({
  selector: 'app-salle',
  templateUrl: './salle.component.html',
  styleUrls: ['./salle.component.css']
})
export class SalleComponent implements OnInit {

  salleDetail!: FormGroup;
  salleobj: Salle = new Salle();
  salleList:Salle[] = [];
  totalRec!: string;
  page:number=1
  constructor(private formBuilder1 : FormBuilder, private salleService: SalleService) { }

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
      alert("profil deleted successfully");
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

}
