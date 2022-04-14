import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/core/models/employee';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-myaccount',
  templateUrl: './myaccount.component.html',
  styleUrls: ['./myaccount.component.css']
})
export class MyaccountComponent implements OnInit {

  account:Employee;
  lastname:any;

  //myaccount:Employee;

  constructor(public authService:AuthService) { }

  ngOnInit() {
    console.log("sallllllllllllllut")
    console.log(this.authService.getUserEmployee().lastname)

    this.lastname=this.authService.getUserEmployee().lastname

  }
  
}
