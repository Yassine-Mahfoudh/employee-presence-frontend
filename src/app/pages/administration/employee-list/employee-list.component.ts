import { Component, OnInit } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Employee } from 'src/app/core/models/employee';
import { EmployeeService } from 'src/app/core/services/employee.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  employeeList:Employee[] = [];
  totalRec!: string;
  page:number=1
  constructor(
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
  }
  getEmployees(){
    this.employeeService.getEmployees().subscribe(res=>{
      this.employeeList=res;
    })
  }
}
