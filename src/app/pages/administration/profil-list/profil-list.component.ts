import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { Profil } from 'src/app/core/models/profil';
import { ProfilService } from 'src/app/core/services/profil.service';

@Component({
  selector: 'app-profil-list',
  templateUrl: './profil-list.component.html',
  styleUrls: ['./profil-list.component.scss']
})
export class ProfilListComponent implements OnInit {
  profilList:Profil[] = [];
  totalRec!: string;
  page:number=1

  constructor( private profilService: ProfilService,  config: NgbModalConfig,
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
    this.profilService.getProfils().subscribe(res=>{
      this.profilList=res;
    })
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
      this.getProfil();
    }
  }

}
