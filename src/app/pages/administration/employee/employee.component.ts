import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Employee } from 'src/app/core/models/employee';
import { Profil } from 'src/app/core/models/profil';
import { Projet } from 'src/app/core/models/projet';
import { Salle } from 'src/app/core/models/salle';
import { EmployeeService } from 'src/app/core/services/employee.service';
import { ProfilService } from 'src/app/core/services/profil.service';
import { ProjetService } from 'src/app/core/services/projet.service';
import { SalleService } from 'src/app/core/services/salle.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  employeeDetail!: FormGroup;
  employeeobj: Employee = new Employee();
  employeeobj0: Employee = new Employee();
  employeeList:Employee[] = [];
  projectList:Projet[] = [];
  salleList:Salle[] = [];
  RoleList:Profil[] = [];
  totalRec!: string;
  page:number=1
  employeeDetail2: FormGroup;

  constructor(private formBuilder : FormBuilder,
     private employeeService: EmployeeService,
     private projetService: ProjetService,
     private profilService: ProfilService,
     private salleService: SalleService,
     config: NgbModalConfig,
      private modalService: NgbModal
     ) {
        // customize default values of modals used by this component tree
 config.backdrop = 'static';
 config.keyboard = false;
      }

  ngOnInit(): void {
    this.getEmployees();
    this.getprojects();
    this.getroles();
    this.getsalles();
    this.employeeDetail = this.formBuilder.group({
      id: [''],
      firstname:[''],
      lastname:[''],
      role:[''],
      status:[''],
      birthdate:[''],
      address:[''],
      phonenumber:[''],
      project:[''],
      salle:['']
    });
    this.employeeDetail2 = this.formBuilder.group({
      id: [''],
      firstname:[''],
      lastname:[''],
      role:[''],
      status:[''],
      birthdate:[''],
      address:[''],
      phonenumber:[''],
      project:[''],
      salle:['']
    });
  }

  open(content) {
    this.modalService.open(content);
  }

  close(content) {
    this.modalService.dismissAll(content);
  }

 

  addEmployee(){

    this.employeeobj.id=this.employeeDetail2.value.id;
    this.employeeobj.lastname=this.employeeDetail2.value.lastname;
    this.employeeobj.firstname=this.employeeDetail2.value.firstname;
    this.employeeobj.role=this.employeeDetail2.value.role;
    this.employeeobj.status=this.employeeDetail2.value.status;
    this.employeeobj.birthdate=this.employeeDetail2.value.birthdate;
    this.employeeobj.address=this.employeeDetail2.value.address;
    this.employeeobj.phonenumber=this.employeeDetail2.value.phonenumber;
    this.employeeobj.project=this.employeeDetail2.value.project;
    this.employeeobj.salle=this.employeeDetail2.value.salle;

    this.employeeService.addEmployee(this.employeeobj).subscribe(res=>{
      console.log(res);
      this.getEmployees();
      this.employeeDetail2=null;
    
    }
    );


}

getEmployees(){
  this.employeeService.getEmployees().subscribe(res=>{
    this.employeeList=res;
  })
}
getroles(){
  this.profilService.getProfils().subscribe(res=>{
    this.RoleList=res;
  })
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

editEmployee(employee : Employee){
  this.employeeDetail.controls['id'].setValue(employee.id);
  this.employeeDetail.controls['lastname'].setValue(employee.lastname);
  this.employeeDetail.controls['firstname'].setValue(employee.firstname);
  this.employeeDetail.controls['role'].setValue(employee.role);
  this.employeeDetail.controls['status'].setValue(employee.status);
  this.employeeDetail.controls['birthdate'].setValue(employee.birthdate);
  this.employeeDetail.controls['address'].setValue(employee.address);
  this.employeeDetail.controls['phonenumber'].setValue(employee.phonenumber);
  this.employeeDetail.controls['project'].setValue(employee.project);
  this.employeeDetail.controls['salle'].setValue(employee.salle);

}

deleteEmployee(employee : Employee){

    this.employeeService.deleteEmployee(employee).subscribe(res=>{
      console.log(res);
      alert("employee deleted successfully");
      this.getEmployees();
    }
    );
  
  }

updateEmployee(){
 
  this.employeeobj.lastname=this.employeeDetail.value.lastname;
  this.employeeobj.firstname=this.employeeDetail.value.firstname;
  this.employeeobj.role=this.employeeDetail.value.role;
  this.employeeobj.status=this.employeeDetail.value.status;
  this.employeeobj.birthdate=this.employeeDetail.value.birthdate;
  this.employeeobj.address=this.employeeDetail.value.address;
  this.employeeobj.phonenumber=this.employeeDetail.value.phonenumber;
  this.employeeobj.project=this.employeeDetail.value.project;
  this.employeeobj.salle=this.employeeDetail.value.salle;
  this.employeeService.updateEmployee(this.employeeobj,this.employeeDetail.value.id).subscribe(res=>{
    console.log(res);
    this.getEmployees();
  }
  );

}

confirmDelete(employee: Employee) {
  if(confirm("Are you sure you want to delete employee "+employee.lastname+' '+employee.firstname)) {
     this.deleteEmployee(employee);
  }
}

}