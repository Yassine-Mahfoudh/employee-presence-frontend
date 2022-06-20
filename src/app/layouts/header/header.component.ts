import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from 'src/app/core/models/employee';
import { AuthService } from 'src/app/core/services/auth.service';
import { EmployeeService } from 'src/app/core/services/employee.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Output() toggleSidebarForMe: EventEmitter<any> = new EventEmitter();

  
   current = new Date();
   employee: Employee = new Employee();
   constructor(private router: Router,
    public authService:AuthService,
   private userService:UserService,
   public employeeService:EmployeeService
    ) {}

  ngOnInit(): void {
    this.getEmp()
  }

  toggleSidebar() {
    this.toggleSidebarForMe.emit();
  }

  public logout(){
   // this.userService.logout(this.authService.getUser());
    this.authService.clear();
    this.router.navigate(['/login']);
  }

  public getEmp(){
    this.employeeService.getEmployeeById(this.authService.getUserEmployee().id).subscribe(res=>{
      this.employee=res
      console.log("this.employee:::",this.employee)
    })
  }

  public validerInfo(){
    if(this.employee.lastname!='' && this.employee.firstname!='' && this.employee.address!='' && this.employee.phonenumber!=null && this.employee.birthdate!=null && this.employee.gender!='')
    {
      return true
    }
    else 
    return false
  }
  
}
