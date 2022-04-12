import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Projet } from 'src/app/core/models/projet';
import { ProjetListService } from 'src/app/core/services/projet-list.service';

@Component({
  selector: 'app-projet-list',
  templateUrl: './projet-list.component.html',
  styleUrls: ['./projet-list.component.css']
})
export class ProjetListComponent implements OnInit {
  

projetList:Projet[] = [];
  totalRec!: string;
  page:number=1
  constructor(private projetListService: ProjetListService,
    config: NgbModalConfig,
     private modalService: NgbModal) { 
       // customize default values of modals used by this component tree
       config.backdrop = 'static';
       config.keyboard = false;

     }

  ngOnInit(): void {
    this.getProjets();
  }

  open(content) {
    this.modalService.open(content);
  }

  close(content) {
    this.modalService.dismissAll(content);
  }

  getProjets(){
    this.projetListService.getProjets().subscribe(res=>{
      this.projetList=res;
    })
  }

}
