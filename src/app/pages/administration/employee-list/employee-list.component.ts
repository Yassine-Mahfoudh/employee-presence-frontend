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
  /*
  getEmployees(){
    this.employeeService.getEmployees().subscribe(res=>{
      this.employeeList=res;
      console.log(this.authService.getUserEmployee())
    })
  }*/


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

    this.employeeList.forEach(employee=>{if(employee.lastname!='' && employee.firstname!='' && employee.address!='' && employee.phonenumber!=null && employee.birthdate!=null){
      results.push(employee);
      this.employeeList2=results;
  

     }} )
  
    });
   

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
    for (const employee of this.employeeList) {
      if (employee.firstname.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || employee.lastname.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || employee.address.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || employee.salle.toString().toLowerCase().indexOf(key.toLowerCase()) !== -1
      || employee.project.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || employee.role.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || employee.birthdate.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || employee.phonenumber.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || employee.manager.toLowerCase().indexOf(key.toLowerCase()) !== -1


      ) {
        results.push(employee);
      }
    }
    this.employeeList = results;
    if (results.length === 0 || !key) {
      this.getEmployees();
    }
  }

}
