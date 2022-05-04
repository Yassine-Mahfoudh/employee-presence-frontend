import { Component, OnInit } from '@angular/core';
import { Logaccess } from 'src/app/core/models/logaccess';
import { Users } from 'src/app/core/models/users';
import { LogaccessService } from 'src/app/core/services/logaccess.service';
import { UsersService } from 'src/app/core/services/users.service';


@Component({
  selector: 'app-logaccess',
  templateUrl: './logaccess.component.html',
  styleUrls: ['./logaccess.component.css']
})
export class LogaccessComponent implements OnInit {

  logaccessList:Logaccess[] = [];
  totalRec!: string;
  page:number=1

  user:Users = new Users();

  constructor(private logaccessService: LogaccessService,
    private usersService:UsersService
    ){


  }



  ngOnInit(): void {
    this.getLogaccess();
  }
  getLogaccess(){
    this.logaccessService.getLogaccess().subscribe(res=>{
      this.logaccessList=res;
    })
  }

  getUser(username : any) {
    this.usersService.getUserByUsername(username).subscribe(res=>{
      this.user=res;
      console.log(this.user);
    })
  }

}

