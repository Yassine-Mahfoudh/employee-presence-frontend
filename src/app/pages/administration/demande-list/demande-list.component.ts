import { Component, OnInit } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Demande } from 'src/app/core/models/demande';
import { DemandeService } from 'src/app/core/services/demande.service';

@Component({
  selector: 'app-demande-list',
  templateUrl: './demande-list.component.html',
  styleUrls: ['./demande-list.component.css']
})
export class DemandeListComponent implements OnInit {

  demandeList:Demande[] = [];
  totalRec!: string;
  page:number=1

  constructor(
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
    
  }

  open(content) {
    this.modalService.open(content);
  }

  close(content) {
    this.modalService.dismissAll(content);
  }
  getDemandes(){
    this.demandeService.getDemandes().subscribe(res=>{
      this.demandeList=res;
    })
  }
}
