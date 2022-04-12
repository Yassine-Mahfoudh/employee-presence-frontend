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
      nom:[''],
      prenom:[''],
      role:[''],
      etat:[''],
      datenaiss:[''],
      adresse:['']
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
    this.employeeobj.nom=this.employeeDetail.value.nom;
    this.employeeobj.prenom=this.employeeDetail.value.prenom;
    this.employeeobj.role=this.employeeDetail.value.role;
    this.employeeobj.etat=this.employeeDetail.value.etat;
    this.employeeobj.datenaiss=this.employeeDetail.value.datenaiss;
    this.employeeobj.adresse=this.employeeDetail.value.adresse;
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
  this.employeeDetail.controls['nom'].setValue(employee.nom);
  this.employeeDetail.controls['prenom'].setValue(employee.prenom);
  this.employeeDetail.controls['role'].setValue(employee.role);
  this.employeeDetail.controls['etat'].setValue(employee.etat);
  this.employeeDetail.controls['datenaiss'].setValue(employee.datenaiss);
  this.employeeDetail.controls['adresse'].setValue(employee.adresse);

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
  this.employeeobj.nom=this.employeeDetail.value.nom;
  this.employeeobj.prenom=this.employeeDetail.value.prenom;
  this.employeeobj.role=this.employeeDetail.value.role;
  this.employeeobj.etat=this.employeeDetail.value.etat;
  this.employeeobj.datenaiss=this.employeeDetail.value.datenaiss;
  this.employeeobj.adresse=this.employeeDetail.value.adresse;
  this.employeeService.updateEmployee(this.employeeobj).subscribe(res=>{
    console.log(res);
    this.getEmployees();
  }
  );

}

confirmDelete(employee: Employee) {
  if(confirm("Are you sure you want to delete employee "+employee.nom)) {
     this.deleteEmployee(employee);
  }
}

}
