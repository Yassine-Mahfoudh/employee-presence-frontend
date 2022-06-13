import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { faPenToSquare, faPlusCircle, faTrash } from '@fortawesome/free-solid-svg-icons';
import { ThirdPartyDraggable } from '@fullcalendar/interaction';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Demande } from 'src/app/core/models/demande';
import { Employee } from 'src/app/core/models/employee';
import { MyEvent } from 'src/app/core/models/myevent';
import { Projet } from 'src/app/core/models/projet';
import { Typedemande } from 'src/app/core/models/typedemande';
import { User } from 'src/app/core/models/user';
import { AuthService } from 'src/app/core/services/auth.service';
import { DemandeService } from 'src/app/core/services/demande.service';
import { EmployeeService } from 'src/app/core/services/employee.service';
import { EventService } from 'src/app/core/services/event.service';
import { ProjetService } from 'src/app/core/services/projet.service';
import { TypedemandeService } from 'src/app/core/services/typedemande.service';
import { UserService } from 'src/app/core/services/user.service';
import { GlobalConstants } from 'src/app/shared/constant/GlobalConstants';
import { SnackbarService } from 'src/app/shared/service/snackbar.service';
import { ConfirmDialogService } from '../dialog-confirmation/confirm-dialog.service';
import { EmployeeListComponent } from '../employee-list/employee-list.component';
import { EditDemandeComponent } from './edit-demande/edit-demande.component';
export function isEmpty(val: any): boolean {
  return val === null || typeof val === 'undefined' || val.toString().trim() === '';
}
@Component({
  selector: 'app-demande',
  templateUrl: './demande.component.html',
  styleUrls: ['./demande.component.scss']
})
export class DemandeComponent implements OnInit {


  demandeobj: Demande = new Demande();
  demandeList:Demande[] = [];
  empDemandes:Demande[] = [];
  totalRec!: string;
  page:number=1
  demandeById: Demande;
  trashIcon = faTrash;
  editIcon = faPenToSquare;
 

  emp: Employee=new Employee();
  employeeById: Employee=new Employee();
  managerdemandes:Demande[] = [];
  employees:Employee[] = [];
  employeeList: Employee[];
  employeeList2: Employee[];
  eventobj: MyEvent=new MyEvent();
  rhdemandes: Demande[] = [];
  projectList: Projet[]=[];
   results: number;
  demandeDetail:FormGroup=new FormGroup({
    id: new FormControl(null),
    title: new FormControl(null),
    description: new FormControl(null),
    datedebut: new FormControl(null),
    datefin: new FormControl(null),
    empnom: new FormControl(null),
    empprenom: new FormControl(null),
    empid: new FormControl(null),
    priorite: new FormControl(null),
    etat: new FormControl(null)
  });

  constructor(private formBuilder : FormBuilder,
     private demandeService: DemandeService,
     public userService:UserService,
     private authservice:AuthService,
     private employeeService:EmployeeService,
     private myeventService:EventService,
     private projetService:ProjetService,
     private confirmDialogService:ConfirmDialogService,
     config: NgbModalConfig,
     private dialog: MatDialog,
      private modalService: NgbModal,
      private snackbar:SnackbarService,
      private typedemandeService:TypedemandeService
     ) {
        // customize default values of modals used by this component tree
 config.backdrop = 'static';
 config.keyboard = false;
      }

  ngOnInit(): void {
  
    this.getDemandes();
    this.gettypeevent();
   // this.getprojetpriority();
  }
  validateDate(){
    if(this.demandeDetail.controls['datedebut'].value >
     this.demandeDetail.controls['datefin'].value){
      return true;
    }
    else{
      return false;
    }
  }
  open(content) {
    this.modalService.open(content);
  }

  close(content) {
    this.modalService.dismissAll(content);
  }

  TypeList:Typedemande[]=[];
  gettypeevent(){
    this.typedemandeService.getTypeDemandes().subscribe(res=>{
      this.TypeList=res;
      console.log("evet type::", this.TypeList);
    })
  }

 /* getprojetpriority()
  {

    this.projetService.getProjets().subscribe(res=>{
      this.projectList=res;

      this.projectList.forEach(projet=>{
        this.employeeService.getEmployeeById(this.authservice.getUser().id).subscribe(res=>{

        if (projet.name==res.project){
          console.log("projet.priority ::",projet.priority)
             this.results=projet.priority;
              console.log("results1 ::", this.results)
            }
          })

        })
})


  }*/
  addDemande(){
  
    console.log(this.demandeDetail);
    this.demandeobj.id=this.demandeDetail.value.id;
    this.demandeobj.empid=this.authservice.getUser().id;
    this.demandeobj.title=this.demandeDetail.value.title;
    this.demandeobj.empnom=this.authservice.getUserEmployee().lastname;


   
    console.log("results 2::", this.results)
    //this.demandeobj.priorite= this.results;
    this.demandeobj.empprenom=this.authservice.getUserEmployee().firstname;
    this.demandeobj.description=this.demandeDetail.value.description;
    this.demandeobj.datedebut=this.demandeDetail.value.datedebut;
    this.demandeobj.datefin=this.demandeDetail.value.datefin;
    this.demandeobj.etat="En Attente";
    this.demandeService.addDemande(this.demandeobj).subscribe(res=>{
      console.log("demande!:::",res);
      this.empDemandes;
    }
    );


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

getDemandes(){
 
  this.getEmployees();
  this.demandeService.getDemandes().subscribe(res=>{
   
    this.demandeList=res;
    this.demandeList.forEach(demande=>{

      if(demande.empid===this.authservice.getUser().id)
      {
        this.empDemandes.push(demande);
       
       
      }
        
    })

    this.employeeList2.forEach(employee=>{
    
      if(employee.managerid==this.authservice.getUser().id){
      
      this.demandeList.forEach(demande=>{
       
        if((demande.empid==employee.id)&&(demande.etat=="En Attente"))
        {
              this.managerdemandes.push(demande);
      }
    })

    }
    })
 

  })
}



getEmpById(id){
  this.employeeService.getEmployeeById(id).subscribe(res=>{
    this.employeeById=res;

  })

}

getlistEmp(){
  this.employeeService.getEmployees().subscribe(res=>{
    this.employees=res;
    
  })
}


getDemandeById(){
  this.demandeService.getDemandeByempId("dem.empid").subscribe(res=>{
    this.demandeById=res;
  
  })
}



editDemande(demande : Demande){
  this.demandeDetail.controls['id'].setValue(demande.id);
  this.demandeDetail.controls['title'].setValue(demande.title);
  this.demandeDetail.controls['description'].setValue(demande.description);
  this.demandeDetail.controls['datedebut'].setValue(demande.datedebut);
  this.demandeDetail.controls['datefin'].setValue(demande.datefin);
  this.demandeDetail.controls['empid'].setValue(demande.empid);
  this.demandeDetail.controls['etat'].setValue(demande.etat);
}

deleteDemande(demande : Demande){

    this.demandeService.deleteDemande(demande).subscribe(res=>{
      console.log(res);
      alert("demande deleted successfully");
      this.empDemandes;
    }
    );
  
  }

updateDemande(demande:Demande){
  
  const dialogRef = this.dialog.open(EditDemandeComponent, {
    disableClose: true,
   data:{
    demande:demande,
   }
  });

  dialogRef.afterClosed().subscribe((result) => {
    if (!isEmpty(result)) {
      console.log('result ::::: ', result)
      this.demandeobj.id=result.data.id;
  this.demandeobj.title=result.data.title;
  this.demandeobj.description=result.data.description;
  this.demandeobj.datedebut=result.data.datedebut;
  this.demandeobj.datefin=result.data.datefin;
  this.demandeobj.empid=result.data.empid;
  this.demandeobj.etat=result.data.etat;

  this.demandeService.updateDemande(this.demandeobj).subscribe(res=>{
    this.snackbar.openSnackBar("Demnde modifié","")
    console.log("this.demandeobjupdate:::",this.demandeobj)
    this.getDemandes()
 
  });
  

    }
  });  

}


public searchDemandemanager(key: string): void {
  console.log(key);
  const results: Demande[] = [];
  for (const demande of this.managerdemandes) {
    if (demande.title.toLowerCase().indexOf(key.toLowerCase()) !== -1
    || demande.empnom.toString().indexOf(key.toLowerCase()) !== -1
    || demande.empprenom.toString().indexOf(key.toLowerCase()) !== -1
    || demande.description.toString().indexOf(key.toLowerCase()) !== -1
    || demande.etat.toString().indexOf(key.toLowerCase()) !== -1
    || demande.datedebut.toString().indexOf(key.toLowerCase()) !== -1
    || demande.datefin.toString().indexOf(key.toLowerCase()) !== -1 ) {
      results.push(demande);
    }
  }
  this.managerdemandes = results;
  if (key=='') {
    this.managerdemandes;
  }
}


public searchDemande(key: string): void {
  console.log(key);
  const results: Demande[] = [];
  for (const demande of this.demandeList) {
    if (demande.title.toLowerCase().indexOf(key.toLowerCase()) !== -1
    || demande.empnom.toString().indexOf(key.toLowerCase()) !== -1
    || demande.empprenom.toString().indexOf(key.toLowerCase()) !== -1
    || demande.description.toString().indexOf(key.toLowerCase()) !== -1
    || demande.etat.toString().indexOf(key.toLowerCase()) !== -1
    || demande.datedebut.toString().indexOf(key.toLowerCase()) !== -1
    || demande.datefin.toString().indexOf(key.toLowerCase()) !== -1 ) {
      results.push(demande);
    }
  }
  this.demandeList = results;
  if (key=='') {
    this.demandeList;
  }
}




AppproverDemande(demande: Demande){


this.eventobj.type="Static";
this.eventobj.id=demande.id;
this.eventobj.title=demande.title;
this.eventobj.description=demande.description;
this.eventobj.start=demande.datedebut;
this.eventobj.end=demande.datefin;
this.eventobj.rrule=null;
if(demande.title==="Presentielle"){
  this.eventobj.color="#FF8B94";}
else if(demande.title==="à distance"){
    this.eventobj.color="#8D7BE0";}
    else{
      this.eventobj.color="#7fd3ed";}


      this.employeeService.getEmployeeById(demande.empid).subscribe(res=>{
        this.employeeById=res;
    
     
        this.eventobj.employee=this.employeeById.firstname;
       
this.myeventService.addEvent(this.eventobj).subscribe(res=>{
  this.demandeService.getDemandeByempId(demande.id).subscribe(res=>{
    this.demandeById=res;
    this.demandeById.etat="Acceptée";
    this.demandeService.updateDemande(this.demandeById).subscribe(res=>{
      console.log(res);
      this.managerdemandes=  this.managerdemandes.filter((demande) => demande.id !== this.demandeById.id)
    }
    );
   
  })
  
  console.log(res);
  
}
)

});
}

RefuserDemande(demande: Demande){

  

    this.demandeService.getDemandeByempId(demande.id).subscribe(res=>{
      this.demandeById=res;
      this.demandeById.etat="Refuseé";
      this.demandeService.updateDemande(this.demandeById).subscribe(res=>{
        console.log(res);
     
        this.managerdemandes=  this.managerdemandes.filter((demande) => demande.id !== this.demandeById.id)
        console.log("managerdemande",   this.managerdemandes)
       
      }
      );

   
     //// for ( let i in this.managerdemandes)
      //{
     ////   if (this.demandeById===this.managerdemandes[i]){
     ////     console.log("liste de demand(i):: ",this.managerdemandes[i]);
      ////    this.deleteDemande(this.managerdemandes[i]);
      ////  }
      
     //// }
     
      
    })
    
  }
  



confirmDelete(demande: Demande){
  this.confirmDialogService.confirm('Confirmation','Voulez-vous confirmer cette opération ?').subscribe((res) => {
    if (res){  
      this.demandeService.deleteDemande(demande).subscribe(res=>{
        console.log(res);
        this.snackbar.openSnackBar("Demande supprimé","")
       
      }
      );
   } })
  
  
  }

handleClear(){
  this.demandeDetail.reset();
}

}
