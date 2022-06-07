import { Component, OnInit } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Employee } from 'src/app/core/models/employee';
import { User } from 'src/app/core/models/user';
import { AuthService } from 'src/app/core/services/auth.service';
import { EmployeeService } from 'src/app/core/services/employee.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {
  employeeList:Employee[] = [];
  totalRec!: string;
  page:number=1
  employeeList2: Employee[]= [];
  constructor(
    private employeeService: EmployeeService,
    config: NgbModalConfig,
     private modalService: NgbModal,
     private authService: AuthService
    ) {
       // customize default values of modals used by this component tree
config.backdrop = 'static';
config.keyboard = false;
     }

  ngOnInit(): void {
    this.getEmployees();
  }
  

  listComboxUsers : Employee[] = [];




getEmployeesRoles(){
  this.employeeService.getEmployees().subscribe(res=>{
    this.employeeList=res;
    const results: any[] = [];
    
    });

  }


getEmployees(){
  this.employeeService.getEmployees().subscribe(res=>{
    this.employeeList=res;
    const results: any[] = [];

    this.employeeList.forEach(employee=>{if(employee.lastname!='' && employee.firstname!='' && employee.address!='' && employee.phonenumber!=null && employee.birthdate!=null && employee.gender!=''){
      results.push(employee);
      this.employeeList2=results;
  

     }} )
  
    });
   

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
  
}
