import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/core/models/employee';
import { AuthService } from 'src/app/core/services/auth.service';
import { MyaccountService } from 'src/app/shared/service/account/myaccount.service';

@Component({
  selector: 'app-myaccount',
  templateUrl: './myaccount.component.html',
  styleUrls: ['./myaccount.component.css']
})
export class MyaccountComponent implements OnInit {

  account:Employee;

  //myaccount:Employee;

  constructor(private myaccountService:MyaccountService,
    private authService:AuthService) { }

  ngOnInit() {
    console.log("sallllllllllllllut")
    this.getMyaccount(this.username);
  }

  username=this.authService.getUsername()

myaccount=this.getMyaccount(this.username) ;
  getMyaccount(name){
    this.myaccountService.getMyaccount(name).subscribe(res=>{
      this.account=res;
      console.log(this.account);
    })
  }
  
}
