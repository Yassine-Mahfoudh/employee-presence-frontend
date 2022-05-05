import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Employee } from 'src/app/core/models/employee';
import { AuthService } from 'src/app/core/services/auth.service';
import { EmployeeService } from 'src/app/core/services/employee.service';
import { UserService } from 'src/app/core/services/user.service';
import { GlobalConstants } from 'src/app/shared/constant/GlobalConstants';
import { SnackbarService } from 'src/app/shared/service/snackbar.service';

declare var $: any;

@Component({
  selector: 'app-myaccount',
  templateUrl: './myaccount.component.html',
  styleUrls: ['./myaccount.component.css']
})
export class MyaccountComponent implements OnInit {

      //changepassword
  changePasswordForm:any = FormGroup;
  responseMessage:any;



  accountDetail!: FormGroup;
  accountobj: Employee = new Employee();
  account:Employee = new Employee() ;
  lastname:any;
  firstname:any;
  birthdate:any;
  address:any;
  phonenumber:any;

  //myaccount:Employee;

  constructor(public authService:AuthService,
    public employeeService:EmployeeService,
    private formBuilder : FormBuilder,
    config: NgbModalConfig,
    private modalService: NgbModal,

    //changepassword
    private userService:UserService,
    private ngxService:NgxUiLoaderService,
    private snackbarService:SnackbarService
    ) {

       // customize default values of modals used by this component tree
       config.backdrop = 'static';
       config.keyboard = false;
       
     }

  ngOnInit() {
    
    let EmpId = this.authService.getUserEmployee().id;
   
    this.accountDetail = this.formBuilder.group({
      lname: [''],
      fname: [''],
      bdate: [''],
      ads: [''],
      phnbr:['']
    });

    console.log("sallllllllllllllut")
    console.log(this.authService.getUserEmployee().lastname)


        //changepassword
this.changePasswordForm=this.formBuilder.group({
  oldPassword:[null,[Validators.required]],
  newPassword:[null,[Validators.required]],
  confirmPassword:[null,[Validators.required]],
})

  this.getEmployee(EmpId);

  }

  getEmployee(id : any) {
    this.employeeService.getEmployeeById(id).subscribe(res=>{
      this.account=res;
      console.log(this.account);
    })
  }

  
  validateSumbit(){
    if(this.changePasswordForm.controls['newPassword'].value != this.changePasswordForm.controls['confirmPassword'].value){
      return true;
    }
    else{
      return false;
    }
  }
  handleChangePasswordSubmit(){
      var formData=this.changePasswordForm.value;
      var data = {
        oldPassword:formData.oldPassword,
        newPassword:formData.newPassword,
        confirmPassword:formData.confirmPassword
      };
      if ( data.oldPassword !== data.newPassword ){
        this.ngxService.start();
      this.userService.changePassword(data).subscribe((response:any)=>
      {
        this.ngxService.stop();
        this.responseMessage = response?.message;
        this.snackbarService.openSnackBar("Password updated",'');
      },
      (error)=>{
        this.ngxService.stop();
        if(error.error?.message){
          this.responseMessage=error.error?.message;
        }
        else{
          this.responseMessage = "Old Password incorrect ";
        }
        this.snackbarService.openSnackBar(
          this.responseMessage,
          GlobalConstants.error
        );
      }
      );
  }else {
    this.snackbarService.openSnackBar("Old Password and New Password should be different","error");
  }
}
  
  
  open(content) {
    this.modalService.open(content);
  }

  close(content) {
    this.modalService.dismissAll(content);
  }


  
  updateAccount(){
    if(this.accountDetail.value.lname == ""){
      this.accountobj.lastname=this.account.lastname;
    }else{
    this.accountobj.lastname=this.accountDetail.value.lname;
    }
    if(this.accountDetail.value.fname == ""){
      this.accountobj.firstname=this.account.firstname;
    }else{
    this.accountobj.firstname=this.accountDetail.value.fname;
    }
    if(this.accountDetail.value.bdate == ""){
      this.accountobj.birthdate=this.account.birthdate;
    }else{
    this.accountobj.birthdate=this.accountDetail.value.bdate;
    }
    if(this.accountDetail.value.ads == ""){
      this.accountobj.address=this.account.address;
    }else{
    this.accountobj.address=this.accountDetail.value.ads;
    }
    if(this.accountDetail.value.phnbr == ""){
      this.accountobj.phonenumber=this.account.phonenumber;
    }else{
    this.accountobj.phonenumber=this.accountDetail.value.phnbr;
    }
  
     // this.authService.setUserEmployee(this.accountobj);
     let EmpId = this.authService.getUserEmployee().id;

     this.employeeService.updateEmployee(this.accountobj,EmpId).subscribe(res=>{
      console.log(res);
    }
    );

    console.log("upaa")

  }

  changePassword(){

  }

 confirmUpdate() {
    var okToRefresh = confirm("Do you really want to update your informations?");
    if (okToRefresh)
      {
          setTimeout("location.reload(true);",500);
          this.updateAccount();
      }
    }

  
}  

