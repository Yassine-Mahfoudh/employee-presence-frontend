import { Component, OnInit } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Departement } from 'src/app/core/models/departement';
import { DepartementService } from 'src/app/core/services/departement.service';

@Component({
  selector: 'app-departement-list',
  templateUrl: './departement-list.component.html',
  styleUrls: ['./departement-list.component.css']
})
export class DepartementListComponent implements OnInit {
 
  departementList:Departement[] = [];
  totalRec!: string;
  page:number=1

  constructor(config: NgbModalConfig,
    private modalService: NgbModal, private departementService: DepartementService ) {
          // customize default values of modals used by this component tree
          config.backdrop = 'static';
          config.keyboard = false;
            } 

  ngOnInit(): void {
    this.getDepartements();
  }
  open(content) {
    this.modalService.open(content);
  }

  close(content) {
    this.modalService.dismissAll(content);
  }
  getDepartements(){
    this.departementService.getDepartements().subscribe(res=>{
      this.departementList=res;
    })
  }
}
