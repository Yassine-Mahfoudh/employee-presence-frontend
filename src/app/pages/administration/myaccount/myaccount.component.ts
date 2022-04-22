import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Employee } from 'src/app/core/models/employee';
import { AuthService } from 'src/app/core/services/auth.service';
import { EmployeeService } from 'src/app/core/services/employee.service';

declare var $: any;

@Component({
  selector: 'app-myaccount',
  templateUrl: './myaccount.component.html',
  styleUrls: ['./myaccount.component.css']
})
export class MyaccountComponent implements OnInit {

  accountDetail!: FormGroup;
  accountobj: Employee = new Employee();
  account:Employee;
  lastname:any;
  firstname:any;
  birthdate:any;
  address:any;
  phonenumber:any;

  //myaccount:Employee;

  constructor(public authService:AuthService,public employeeService:EmployeeService,private formBuilder : FormBuilder,  config: NgbModalConfig,
    private modalService: NgbModal) {

       // customize default values of modals used by this component tree
       config.backdrop = 'static';
       config.keyboard = false;
     }

  ngOnInit() {

    this.accountDetail = this.formBuilder.group({
      lname: [''],
      fname: [''],
      bdate: [''],
      ads: [''],
      phnbr:['']
    });

    console.log("sallllllllllllllut")
    console.log(this.authService.getUserEmployee().lastname)

    this.lastname=this.authService.getUserEmployee().lastname
    this.firstname=this.authService.getUserEmployee().firstname
    this.birthdate=this.authService.getUserEmployee().birthdate
    this.address=this.authService.getUserEmployee().address
    this.phonenumber=this.authService.getUserEmployee().phonenumber

    
    
  }

  
  
  open(content) {
    this.modalService.open(content);
  }

  close(content) {
    this.modalService.dismissAll(content);
  }


  
  updateAccount(){
    this.accountobj.lastname=this.accountDetail.value.lname;
    this.accountobj.firstname=this.accountDetail.value.fname;
    this.accountobj.birthdate=this.accountDetail.value.bdate;
    this.accountobj.address=this.accountDetail.value.ads;
    this.accountobj.phonenumber=this.accountDetail.value.phnbr;
      this.authService.setUserEmployee(this.accountobj);

    
  }



  
}  


