import { Component, OnInit } from '@angular/core';
import { Logdata } from 'src/app/core/models/logdata';
import { LogdataService } from 'src/app/core/services/logdata.service';

@Component({
  selector: 'app-logdata',
  templateUrl: './logdata.component.html',
  styleUrls: ['./logdata.component.scss']
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

 public searchLogdata(key: string): void {
    console.log(key);
    const results: Logdata[] = [];
    for (const logdata of this.logdataList) {
      if (
        logdata.username.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || logdata.action.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || logdata.dateAction.toLowerCase().indexOf(key.toLowerCase()) !== -1
      ) {
        results.push(logdata);
      }
    }
    this.logdataList = results;
    if (key=='') {
      this.getLogdata();
    }
  }

}
