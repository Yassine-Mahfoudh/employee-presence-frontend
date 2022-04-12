import { Component, OnInit } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Logaccess } from 'src/app/core/models/logaccess';
import { LogaccessService } from 'src/app/core/services/logaccess.service';


@Component({
  selector: 'app-logaccess',
  templateUrl: './logaccess.component.html',
  styleUrls: ['./logaccess.component.css']
})
export class LogaccessComponent implements OnInit {

  logaccessList:Logaccess[] = [];
  totalRec!: string;
  page:number=1

  constructor(private logaccessService: LogaccessService,
    config: NgbModalConfig,
     private modalService: NgbModal)
     {
       // customize default values of modals used by this component tree
config.backdrop = 'static';
config.keyboard = false;
     } 

  ngOnInit(): void {
    this.getLogaccess();
  }
  open(content) {
    this.modalService.open(content);
  }

  close(content) {
    this.modalService.dismissAll(content);
  }
  getLogaccess(){
    this.logaccessService.getLogaccess().subscribe(res=>{
      this.logaccessList=res;
    })
  }
}

