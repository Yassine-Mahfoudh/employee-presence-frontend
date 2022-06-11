import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Employee } from 'src/app/core/models/employee';
import { Profil } from 'src/app/core/models/profil';
import { Projet } from 'src/app/core/models/projet';
import { Salle } from 'src/app/core/models/salle';
import { EmployeeService } from 'src/app/core/services/employee.service';
import { ProjetService } from 'src/app/core/services/projet.service';
import { SalleService } from 'src/app/core/services/salle.service';
import { GlobalConstants } from 'src/app/shared/constant/GlobalConstants';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent implements OnInit {


  projectList:Projet[] = [];
  profilsList:Profil[]=[];
  
  salleList:Salle[] = [];
  employeeobj: Employee = new Employee();
  employeeList:Employee[] = [];
  employeeList2:Employee[] = [];

  listComboxUsers : Employee[] = [];
  managerList: Employee[] = [];
  id_edit_user: any;

  constructor(private dialog: MatDialogRef<EditEmployeeComponent,
     { data: any }>,
    @Inject(MAT_DIALOG_DATA) data,
   private employeeService:EmployeeService,
   private projetService:ProjetService,
   private salleService:SalleService) { 

    this.employeeDetail=new FormGroup({
      id: new FormControl(data.employee.id),
      lastname: new FormControl(data.employee.lastname,[Validators.required, Validators.pattern(GlobalConstants.nameRegex)]),
      firstname: new FormControl(data.employee.firstname,[Validators.required, Validators.pattern(GlobalConstants.nameRegex)]),
      phonenumber: new FormControl(data.employee.phonenumber,[Validators.required,Validators.maxLength(8),Validators.pattern(GlobalConstants.numberRegex)]),
      address: new FormControl(data.employee.address,[Validators.required,Validators.minLength(4)]),
      birthdate: new FormControl(data.employee.birthdate),
      manager: new FormControl(data.employee.manager),
      project: new FormControl(data.employee.project),
      salle: new FormControl(data.employee.salle),
  
    });;
   }

  ngOnInit(): void {
    this.getEmployees();
    this.getprojects();
    this.getsalles();
  
  }
  
  employeeDetail: FormGroup;
  getFormControl(key: string): FormControl {
    return this.employeeDetail.controls[key] as FormControl;
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


  onSuccessAdd() {

     if(this.employeeDetail.valid){
      const data = this.employeeDetail.getRawValue();
      console.log("data :::",data)
      this.dialog.close({
        data: data,
       
      });
    }
  }
  handleClear(){
    this.employeeDetail.reset();
  }
}
