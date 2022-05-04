import { Component, OnInit } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Fonctionalite } from 'src/app/core/models/fonctionalite';
import { FonctionaliteService } from 'src/app/core/services/fonctionalite.service';

@Component({
  selector: 'app-fonctionalite-list',
  templateUrl: './fonctionalite-list.component.html',
  styleUrls: ['./fonctionalite-list.component.css']
})
export class FonctionaliteListComponent implements OnInit {

  fonctionaliteList:Fonctionalite[] = [];
  totalRec!: string;
  page:number=1

  constructor(private fonctionaliteService: FonctionaliteService,
    config: NgbModalConfig,
     private modalService: NgbModal)
     {
       // customize default values of modals used by this component tree
config.backdrop = 'static';
config.keyboard = false;
     } 

  ngOnInit(): void {
    this.getFonctionalites();
  }
  open(content) {
    this.modalService.open(content);
  }

  close(content) {
    this.modalService.dismissAll(content);
  }
  getFonctionalites(){
    this.fonctionaliteService.getFonctionalites().subscribe(res=>{
      this.fonctionaliteList=res;
      console.log(res)
    })
  }
}
