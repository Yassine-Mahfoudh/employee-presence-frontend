import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { config } from 'rxjs';
import { Salle } from 'src/app/core/models/salle';
import { SalleListService } from 'src/app/core/services/salle-list.service';

@Component({
  selector: 'app-salle-list',
  templateUrl: './salle-list.component.html',
  styleUrls: ['./salle-list.component.css']
})
export class SalleListComponent implements OnInit {
  salleList1:Salle[] = [];
  totalRec!: string;
  page:number=1

  constructor(
     private salleListService: SalleListService,
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
  this.salleListService.getSalle().subscribe(res=>{
    this.salleList1=res;
  })
}


}
