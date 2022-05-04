import { Component, OnInit } from '@angular/core';
import { Logdata } from 'src/app/core/models/logdata';
import { LogdataService } from 'src/app/core/services/logdata.service';

@Component({
  selector: 'app-logdata',
  templateUrl: './logdata.component.html',
  styleUrls: ['./logdata.component.css']
})
export class LogdataComponent implements OnInit {

  logdataList:Logdata[] = [];
  totalRec!: string;
  page:number=1


  constructor(private logdataService: LogdataService){


  }



  ngOnInit(): void {
    this.getLogdata();
  }
  getLogdata(){
    this.logdataService.getLogdata().subscribe(res=>{
      this.logdataList=res;
    })
  }
}
