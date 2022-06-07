import { Component, OnInit } from '@angular/core';
import { Logaccess } from 'src/app/core/models/logaccess';
import { User } from 'src/app/core/models/user';
import { LogaccessService } from 'src/app/core/services/logaccess.service';


@Component({
  selector: 'app-logaccess',
  templateUrl: './logaccess.component.html',
  styleUrls: ['./logaccess.component.scss']
})
export class LogaccessComponent implements OnInit {

  logaccessList:Logaccess[] = [];
  totalRec!: string;
  page:number=1

  user:User = new User();

  constructor(private logaccessService: LogaccessService,){}



  ngOnInit(): void {
    this.getLogaccess();
  }
  getLogaccess(){
    this.logaccessService.getLogaccess().subscribe(res=>{
      this.logaccessList=res;
    })
  }


  public searchLogaccess(key: string): void {
    console.log(key);
    const results: Logaccess[] = [];
    for (const logaccess of this.logaccessList) {
      if (
        logaccess.username.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || logaccess.dateAuth.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || logaccess.codeAccess.toLowerCase().indexOf(key.toLowerCase()) !== -1
      ) {
        results.push(logaccess);
      }
    }
    this.logaccessList = results;
    if (key=='') {
      this.getLogaccess();
    }
  }
}

