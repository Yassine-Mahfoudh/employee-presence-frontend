import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
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

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {
  
  trashIcon = faTrash;
  editIcon = faPenToSquare;
  addIcon = faPlusCircle;

  employeeDetail!: FormGroup;
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
      private userService:UserService
     ) {
        // customize default values of modals used by this component tree
 config.backdrop = 'static';
 config.keyboard = false;
      }

  ngOnInit(): void {
    this.getEmployees();
    this.getprojects();
    this.getsalles();
  

    this.employeeDetail = this.formBuilder.group({
      id: [''],
      lastname:[null,[Validators.required,Validators.pattern(GlobalConstants.nomprenomRegex),Validators.minLength(3)]],
      firstname:[null,[Validators.required,Validators.pattern(GlobalConstants.nomprenomRegex),Validators.minLength(3)]],
      birthdate:[null,[Validators.required,Validators.minLength(10)]],

      address:[null,[Validators.required,Validators.minLength(4)]],
      phonenumber:[null,[Validators.required,Validators.minLength(8),Validators.maxLength(8),Validators.pattern(GlobalConstants.numberRegex)]],
      manager:[''],
      project:[''],
      salle:[''],
    });
   
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
     console.log('employeeList2 :',this.listComboxUsers)
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
    console.log('managerList :',this.managerList)
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
    console.log("salleList:::",this.salleList);
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
  

updateEmployee(){

  console.log("this.employeeDetail.value:::",this.employeeDetail.value)

  this.employeeobj.id=this.employeeDetail.value.id;
  this.employeeobj.lastname=this.employeeDetail.value.lastname;
  this.employeeobj.firstname=this.employeeDetail.value.firstname;
  this.employeeobj.birthdate=this.employeeDetail.value.birthdate;
  this.employeeobj.address=this.employeeDetail.value.address;
  this.employeeobj.phonenumber=this.employeeDetail.value.phonenumber;
  this.employeeobj.project=this.employeeDetail.value.project;
  this.employeeobj.salle=this.employeeDetail.value.salle;
  this.employeeobj.manager=this.employeeDetail.value.manager;

  
  

  this.employeeService.getEmployeeByName(this.employeeobj.manager).subscribe(res=>{
    // this.employeebyname=res;

    this.employeeobj.managerid=res.id
    this.employeeobj.gender=res.gender

   console.log(' to update ::: ',this.employeeobj,this.employeeobj.id)
    this.employeeService.updateEmployee(this.employeeobj,this.employeeobj.id).subscribe(ress=>{
    
      console.log('id manager ',ress);
  
      this.getEmployees();
  
    
    }
    );
  })
 
}

confirmDelete(employee: Employee) {
  if(confirm("Are you sure you want to delete employee "+employee.lastname+' '+employee.firstname)) {
     this.deleteEmployee(employee);
  }
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