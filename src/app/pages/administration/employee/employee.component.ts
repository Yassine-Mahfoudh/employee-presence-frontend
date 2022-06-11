import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Employee } from 'src/app/core/models/employee';
import { Projet } from 'src/app/core/models/projet';
import { Salle } from 'src/app/core/models/salle';
import { EmployeeService } from 'src/app/core/services/employee.service';
import { ProjetService } from 'src/app/core/services/projet.service';
import { SalleService } from 'src/app/core/services/salle.service';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/core/services/auth.service';
import { UserService } from 'src/app/core/services/user.service';
import { Profil } from 'src/app/core/models/profil';
import { GlobalConstants } from 'src/app/shared/constant/GlobalConstants';
import { EditEmployeeComponent } from './edit-employee/edit-employee.component';
import { MatDialog } from '@angular/material/dialog';
import { SnackbarService } from 'src/app/shared/service/snackbar.service';
import { ConfirmDialogService } from '../dialog-confirmation/confirm-dialog.service';
export function isEmpty(val: any): boolean {
  return val === null || typeof val === 'undefined' || val.toString().trim() === '';
}
@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {
  
  trashIcon = faTrash;
  editIcon = faPenToSquare;
  addIcon = faPlusCircle;


  employeeDetail: FormGroup=new FormGroup({
    id: new FormControl(null),
    lastname: new FormControl(null,[Validators.required, Validators.pattern(GlobalConstants.nameRegex)]),
    firstname: new FormControl(null,[Validators.required, Validators.pattern(GlobalConstants.nameRegex)]),
    phonenumber: new FormControl(null,[Validators.required,Validators.maxLength(8),Validators.pattern(GlobalConstants.numberRegex)]),
    address: new FormControl(null,[Validators.required,Validators.minLength(4)]),
    manager: new FormControl(null),
    project: new FormControl(null),
    salle: new FormControl(null),

  });;
  employeeobj: Employee = new Employee();
  employeeList:Employee[] = [];
  employeeList2:Employee[] = [];
  projectList:Projet[] = [];
  profilsList:Profil[]=[];
  
  salleList:Salle[] = [];
  totalRec!: string;
  page:number=1;
  r:any;
  
theProfil:String;
  employeebyname: Employee =new Employee();
  managerList: Employee[] = [];

  constructor(private formBuilder : FormBuilder,
     private employeeService: EmployeeService,
     private projetService: ProjetService,
     private salleService: SalleService,
     config: NgbModalConfig,
      private modalService: NgbModal,
      private authService:AuthService,
      private userService:UserService,
     private snackbar:SnackbarService, private dialog: MatDialog,private confirmDialogService:ConfirmDialogService
     ) {
        // customize default values of modals used by this component tree
 config.backdrop = 'static';
 config.keyboard = false;
      }

  ngOnInit(): void {
    this.getEmployees();
    this.getprojects();
    this.getsalles();
  

    
   
  }

  open(content) {
    this.modalService.open(content);
  }

  close(content) {
    this.modalService.dismissAll(content);
  }

 
  
listComboxUsers : Employee[] = [];




getEmployees(){
  this.employeeService.getEmployees().subscribe(res=>{
    this.employeeList=res;
    const results: any[] = [];

    this.employeeList.forEach(employee=>{if(employee.lastname!='' && employee.firstname!='' && employee.address!='' && employee.phonenumber!=null && employee.birthdate!=null && employee.gender!=''){
      results.push(employee);
      this.employeeList2=results;
  

     }} )
     const res2: any[] = [];
    
     this.employeeList2.forEach(employee=>{
      for(let i in employee.listeProfils){
        if(employee.listeProfils[i]==="MANAGER")
        {
       res2.push(employee);
       this.managerList= res2;
       this.listComboxUsers=res2

       this.listComboxUsers= this.listComboxUsers.filter((user) => user.id !== this.id_edit_user)
     }
     }

   

       })

    });
  }
  

getprojects(){
  this.projetService.getProjets().subscribe(res=>{
    this.projectList=res;
   
  })
}
getsalles(){
  this.salleService.getSalles().subscribe(res=>{
    this.salleList=res;

  })
}
id_edit_user;
editEmployee(employee : Employee){
  this.id_edit_user=employee.id
  this.employeeDetail.controls['id'].setValue(employee.id);
  this.employeeDetail.controls['lastname'].setValue(employee.lastname);
  this.employeeDetail.controls['firstname'].setValue(employee.firstname);
  this.employeeDetail.controls['birthdate'].setValue(employee.birthdate);
  this.employeeDetail.controls['address'].setValue(employee.address);
  this.employeeDetail.controls['phonenumber'].setValue(employee.phonenumber);
  this.employeeDetail.controls['project'].setValue(employee.project);
  this.employeeDetail.controls['salle'].setValue(employee.salle);
  this.employeeDetail.controls['manager'].setValue(employee.manager);

  this.getEmployees();
}

deleteEmployee(employee : Employee){

    this.employeeService.deleteEmployee(employee).subscribe(res=>{
      console.log(res);
      alert("employee deleted successfully");
      this.getEmployees();
    }
    );
  
  }

  //get employee by name
  getempbyname(name:string){

    this.employeeService.getEmployeeByName(name).subscribe(res=>{
      this.employeebyname=res;
      return res
     
    })
    let a=this.employeebyname;
return a;
  }
  

updateEmployee(employee:Employee){
  const dialogRef = this.dialog.open(EditEmployeeComponent, {
    disableClose: true,
    height: '700px',
    
    data:{
      employee:employee
    }
  },
  );
  dialogRef.afterClosed().subscribe((result) => {
    if (!isEmpty(result)) {
      console.log('result ',result);
      this.employeeobj.id=result.data.id;
  this.employeeobj.lastname=result.data.lastname;
  this.employeeobj.firstname=result.data.firstname;
  this.employeeobj.birthdate=result.data.birthdate;
  this.employeeobj.address=result.data.address;
  this.employeeobj.phonenumber=result.data.phonenumber;
  this.employeeobj.project=result.data.project;
  this.employeeobj.salle=result.data.salle;
  this.employeeobj.manager=result.data.manager;


  this.employeeService.getEmployeeByName(result.data.manager).subscribe(res=>{
    this.employeeobj.managerid=res.id
    this.employeeobj.gender=res.gender

    this.employeeService.updateEmployee(this.employeeobj,this.employeeobj.id).subscribe(ress=>{
    
      console.log('id manager ',ress);
  
      this.getEmployees();
  
    
    });
    })

}
});  
 
}
confirmDelete(employee: Employee){
  this.confirmDialogService.confirm('Confirmation','Voulez-vous confirmer cette opération ?').subscribe((res) => {
    if (res){  
      this.employeeService.deleteEmployee(employee).subscribe(res=>{
        console.log(res);
        alert("user deleted successfully");
        this.getEmployees();
      }
      );
   } })
  
  
  }


getStatut(employee : Employee):String{

  if(this.authService.getUserEmployee().id===employee.id){
    return "Actif"
  }else
  return"Inactif";
}



public searchEmployees(key: string): void {
  console.log(key);
  const results: Employee[] = [];
  for (const employee of this.employeeList2) {
    if (employee.lastname.toLowerCase().indexOf(key.toLowerCase()) !== -1
    || employee.firstname.toLowerCase().indexOf(key.toLowerCase()) !== -1
    || employee.address.toLowerCase().indexOf(key.toLowerCase()) !== -1
    || employee.birthdate.toLowerCase().indexOf(key.toLowerCase()) !== -1
    || employee.manager.toLowerCase().indexOf(key.toLowerCase()) !== -1
    || employee.salle.toLowerCase().indexOf(key.toLowerCase()) !== -1
    || employee.project.toLowerCase().indexOf(key.toLowerCase()) !== -1
    || employee.phonenumber.toString().toLowerCase().indexOf(key.toLowerCase()) !== -1
    || employee.listeProfils.toString().toLowerCase().indexOf(key.toLowerCase()) !== -1

    
    
    ) {
      results.push(employee);
    }
  }
  this.employeeList2 = results;
  if (key=='') {
    this.getEmployees();
  }
}


handleClear(){
  this.employeeDetail.reset();
}

getUser(id:any):String{

  this.userService.getUserById(id).subscribe(res=>{
    this.r=res
  })
  console.log("this.r.profils[0].name :",this.r.profils[0].name)
  let res=""
  for(let i;i<this.r.profils.length;i++){
    res=res+this.r.profils[i].name
  }
  return res
}

}