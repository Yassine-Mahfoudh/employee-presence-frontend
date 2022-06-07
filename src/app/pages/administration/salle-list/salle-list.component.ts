import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { Salle } from 'src/app/core/models/salle';
import { SalleService } from 'src/app/core/services/salle.service';

@Component({
  selector: 'app-salle-list',
  templateUrl: './salle-list.component.html',
  styleUrls: ['./salle-list.component.scss']
})
export class SalleListComponent implements OnInit {
  salleList:Salle[] = [];
  totalRec!: string;
  page:number=1

  constructor(
     private salleService: SalleService,
     config: NgbModalConfig,
      private modalService: NgbModal
     ) {
        // customize default values of modals used by this component tree
 config.backdrop = 'static';
 config.keyboard = false;
      }

  ngOnInit(): void {
    this.getSalle();
  
  }

  open(content) {
    this.modalService.open(content);
  }

  close(content) {
    this.modalService.dismissAll(content);
  }



getSalle(){
  this.salleService.getSalles().subscribe(res=>{
    this.salleList=res;
  })
}


public searchSalles(key: string): void {
  console.log(key);
  const results: Salle[] = [];
  for (const salle of this.salleList) {
    if (
      salle.nom.toLowerCase().indexOf(key.toLowerCase()) !== -1
    || salle.type.toLowerCase().indexOf(key.toLowerCase()) !== -1
    || salle.nbposte.toString().toLowerCase().indexOf(key.toLowerCase()) !== -1
    || salle.pourcentagePres.toString().toLowerCase().indexOf(key.toLowerCase()) !== -1
    || salle.dep.toString().toLowerCase().indexOf(key.toLowerCase()) !== -1
    
    ) {
      results.push(salle);
    }
  }
  this.salleList = results;
  if (key=='') {
    this.getSalle();
  }
}


}
