import { Component, OnInit } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Employee } from 'src/app/core/models/employee';
import { AuthService } from 'src/app/core/services/auth.service';
import { EmployeeService } from 'src/app/core/services/employee.service';

@Component({
  selector: 'app-mon-equipe',
  templateUrl: './mon-equipe.component.html',
  styleUrls: ['./mon-equipe.component.scss']
})
export class MonEquipeComponent implements OnInit {
  monequipe:Employee[] = [];
  totalRec!: string;
  page:number=1
  monequipe2: Employee[]= [];
  constructor(
    private employeeService: EmployeeService,
    private authservice:AuthService,
    config: NgbModalConfig,
     private modalService: NgbModal,

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
      this.monequipe=res;
      const results: any[] = [];
  
      this.monequipe.forEach(employee=>{if(  employee.managerid==this.authservice.getUser().id && employee.lastname!='' && employee.firstname!='' && employee.address!='' && employee.phonenumber!=null && employee.birthdate!=null){
        results.push(employee);
        this.monequipe2=results;
    
  
       }} )
    
      });
     
  
    }



    public searchEmployees(key: string): void {
      console.log(key);
      const results: Employee[] = [];
      for (const employee of this.monequipe2) {
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
      this.monequipe2 = results;
      if (key=='') {
        this.getEmployees();
      }
    }
    
  }
