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
import { ToastService } from '../../service-toast/toast.service';
import { ConfirmDialogService } from '../dialog-confirmation/confirm-dialog.service';

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
  photo:any;
  userFile ;
  public imagePath;
  imgURL: any;
  public message: string;
  sexe:any;

  maxDate = new Date(2000, 0, 1);

  minDate = new Date(1962, 0, 1);


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
    ,private confirmDialogService:ConfirmDialogService,
    private toast: ToastService,
    ) {

       // customize default values of modals used by this component tree
       config.backdrop = 'static';
       config.keyboard = false;
       
     }
     EmpId
  ngOnInit() {
    
    console.log(this.imgURL);
    this.EmpId = this.authService.getUserEmployee().id;
   
    this.accountDetail = this.formBuilder.group({
      lname: [''],
      fname: [''],
      bdate: [''],
      ads: [''],
      phnbr:[''],
      photo:[''],
      gender:['']
    });

    console.log(this.authService.getUserEmployee().lastname)


        //changepassword
this.changePasswordForm=this.formBuilder.group({
  oldPassword:[null,[Validators.required]],
  newPassword:[null,[Validators.required]],
  confirmPassword:[null,[Validators.required]],
})

  this.getEmployee(this.EmpId);

  }

  getEmployee(id : any) {
    this.employeeService.getEmployeeById(id).subscribe(res=>{
      this.account=res;
        if(this.disabled==false){  
      if(res.firstname!="" && res.firstname!=null){  
          
        this.accountDetail = this.formBuilder.group({
          lname: {value:res.lastname , disabled: true},
          fname: {value:res.firstname, disabled: true},
          bdate: {value:res.birthdate, disabled: true},
          ads: {value:res.address, disabled: true},
          phnbr:{value:res.phonenumber, disabled: true},
          photo:{value:'', disabled: true},
          gender:{value:res.gender, disabled: true}
        });
      }
      else {
        this.accountDetail = this.formBuilder.group({
          lname: {value:'', disabled: true},
          fname: {value:'', disabled: true},
          bdate: {value:'', disabled: true},
          ads: {value:'', disabled: true},
          phnbr:{value:'', disabled: true},
          photo:{value:'', disabled: true},
          gender:{value:'', disabled: true}
        });
      }
      }
      else {
        if(res.firstname!="" && res.firstname!=null){  
          
          this.accountDetail = this.formBuilder.group({
            lname: {value:res.lastname , disabled: false},
            fname: {value:res.firstname, disabled: false},
            bdate: {value:res.birthdate, disabled: false},
            ads: {value:res.address, disabled: false},
            phnbr:{value:res.phonenumber, disabled: false},
            photo:{value:'', disabled: false},
            gender:{value:res.gender, disabled: false}
          });
        }
        else {
          this.accountDetail = this.formBuilder.group({
            lname: {value:'', disabled: false},
            fname: {value:'', disabled: false},
            bdate: {value:'', disabled: false},
            ads: {value:'', disabled: false},
            phnbr:{value:'', disabled: false},
            photo:{value:'', disabled: false},
            gender:{value:'', disabled: false}
          });
        }
      }
     
    // }
      console.log("getEmployee",this.account);
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

  validateBirthDate(){
    if(this.accountDetail.controls['bdate'].value.substr(0,4) > 2000){
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
        this.snackbarService.openSnackBar("Mot de passe modifié",'');
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
  

onSelectFile(event) {
  if (event.target.files.length > 0)
  {
    const file = event.target.files[0];
    this.userFile = file;
   // this.f['profile'].setValue(file);

  var mimeType = event.target.files[0].type;
  if (mimeType.match(/image\/*/) == null) {
    this.message = "Only images are supported.";
    return;
  }

  var reader = new FileReader();
  
  this.imagePath = file;
  reader.readAsDataURL(file); 
  reader.onload = (_event) => { 
    this.imgURL = reader.result; 
  }
}
  }
   
  

    

  open(content) {
    this.modalService.open(content);
  }

  close(content) {
    this.modalService.dismissAll(content);
  }


  onDataChange(event) {
    this.sexe=event.value;
    console.log(event.value);    
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
    }if(this.accountDetail.value.photo == ""){
      this.accountobj.photo=this.account.photo;
    }else{
    this.accountobj.photo=this.accountDetail.value.photo;
    }
    this.accountobj.gender=this.sexe
  console.log("sexeeeeeeeeee::::",this.sexe)
    console.log("this.accountDetail:::",this.accountDetail.value)
    let EmpId = this.authService.getUserEmployee().id;

    this.employeeService.getEmployeeById(EmpId).subscribe(res=>{
      console.log("before :::",this.accountobj)
      this.accountobj.salle=res.salle;
     this.accountobj.project=res.project;
     this.accountobj.manager=res.manager;
     this.accountobj.managerid=res.managerid;
     console.log("after :::",this.accountobj)
     this.employeeService.updateEmployee(this.accountobj,EmpId).subscribe(res=>{
      console.log("resultat:::",res);
      this.toast.success("Compte modifié avec succès");
      this.disabled=false
      this.getEmployee(EmpId)
      
    });
  })
  
}



  /*
      this.employeeobj.managerid=res.id
     console.log(' to update ::: ',this.employeeobj,this.employeeobj.id)
      this.employeeService.updateEmployee(this.employeeobj,this.employeeobj.id).subscribe(ress=>{
      
        console.log('id manager ',ress);
    
        this.getEmployees();
    
      
      }
      );*/

      

mettre(){
  this.disabled=true
  this.getEmployee(this.EmpId)
}

disabled= false
annuler(){
this.disabled=false
this.getEmployee(this.EmpId)
}

 confirmUpdate() {
    // var okToRefresh = confirm("Do you really want to update your informations?");
    // if (okToRefresh)
    //   {
         
    //       this.updateAccount();
    //   }
      this.confirmDialogService.confirm('Confirmation','Voulez-vous confirmer cette opération ?').subscribe((res) => {
        if (res){ 
          this.updateAccount();
        } })
    }

    modif(){
      console.log('this.accountDetail :: ',this.accountDetail)
    }
}  

