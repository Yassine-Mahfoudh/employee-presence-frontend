import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Employee } from 'src/app/core/models/employee';
import { EmployeeService } from 'src/app/core/services/employee.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  employeeDetail!: FormGroup;
  employeeobj: Employee = new Employee();
  employeeList:Employee[] = [];
  totalRec!: string;
  page:number=1

  constructor(private formBuilder : FormBuilder,
     private employeeService: EmployeeService,
     config: NgbModalConfig,
      private modalService: NgbModal
     ) {
        // customize default values of modals used by this component tree
 config.backdrop = 'static';
 config.keyboard = false;
      }

  ngOnInit(): void {
    this.getEmployees();
    this.employeeDetail = this.formBuilder.group({
      id: [''],
      firstname:[''],
      lastname:[''],
      role:[''],
      status:[''],
      birthdate:[''],
      address:['']
    });
  }

  open(content) {
    this.modalService.open(content);
  }

  close(content) {
    this.modalService.dismissAll(content);
  }

 

  addEmployee(){

    console.log(this.employeeDetail);
    this.employeeobj.id=this.employeeDetail.value.id;
    this.employeeobj.lastname=this.employeeDetail.value.lastname;
    this.employeeobj.firstname=this.employeeDetail.value.firstname;
    this.employeeobj.role=this.employeeDetail.value.role;
    this.employeeobj.status=this.employeeDetail.value.status;
    this.employeeobj.birthdate=this.employeeDetail.value.birthdate;
    this.employeeobj.address=this.employeeDetail.value.address;
    this.employeeService.addEmployee(this.employeeobj).subscribe(res=>{
      console.log(res);
      this.getEmployees();
    }
    );


}

getEmployees(){
  this.employeeService.getEmployees().subscribe(res=>{
    this.employeeList=res;
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
  this.employeeobj.id=this.employeeDetail.value.id;
  this.employeeobj.lastname=this.employeeDetail.value.lastname;
  this.employeeobj.firstname=this.employeeDetail.value.firstname;
  this.employeeobj.role=this.employeeDetail.value.role;
  this.employeeobj.status=this.employeeDetail.value.status;
  this.employeeobj.birthdate=this.employeeDetail.value.birthdate;
  this.employeeobj.address=this.employeeDetail.value.address;
  this.employeeService.updateEmployee(this.employeeobj).subscribe(res=>{
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
