import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { Profil } from 'src/app/core/models/profil';
import { ProfilListService } from 'src/app/core/services/profil-list.service';

@Component({
  selector: 'app-profil-list',
  templateUrl: './profil-list.component.html',
  styleUrls: ['./profil-list.component.css']
})
export class ProfilListComponent implements OnInit {
  profiList1:Profil[] = [];
  totalRec!: string;
  page:number=1

  constructor( private profillistService: ProfilListService,  config: NgbModalConfig,
    private modalService: NgbModal) {  
       // customize default values of modals used by this component tree
      config.backdrop = 'static';
      config.keyboard = false;}
  ngOnInit(): void {

    this.getProfil();
  }
  open(content) {
    this.modalService.open(content);
  }

  close(content) {
    this.modalService.dismissAll(content);
  }
  getProfil(){
    this.profillistService.getlistProfils().subscribe(res=>{
      this.profiList1=res;
    })
  }
}
