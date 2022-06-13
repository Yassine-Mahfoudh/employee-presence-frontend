import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, AbstractControl, Validators } from '@angular/forms';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/core/models/user';
import { UserService } from 'src/app/core/services/user.service';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { Profil } from 'src/app/core/models/profil';
import { ProfilService } from 'src/app/core/services/profil.service';
import { HttpErrorResponse } from '@angular/common/http';
import { SnackbarService } from 'src/app/shared/service/snackbar.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { GlobalConstants } from 'src/app/shared/constant/GlobalConstants';
import { ConfirmDialogService } from '../dialog-confirmation/confirm-dialog.service';
import { MatDialog } from '@angular/material/dialog';
import { AddUserComponent } from './add-user/add-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';
export function isEmpty(val: any): boolean {
  return val === null || typeof val === 'undefined' || val.toString().trim() === '';
}
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})

export class UsersComponent implements OnInit {

  trashIcon = faTrash;
  editIcon = faPenToSquare;
  addIcon = faPlusCircle;

  userDetail: FormGroup=new FormGroup({
    id: new FormControl(null),
    userName: new FormControl(null,[Validators.required, Validators.pattern(GlobalConstants.nameRegex)]),
    userPassword: new FormControl(null,[Validators.required,Validators.minLength(4),Validators.pattern(GlobalConstants.nameRegex)]),
    email: new FormControl(null,[Validators.required, Validators.pattern(GlobalConstants.emailRegex)]),
    profil: new FormControl(null),

  });;

  
  userobj: User = new User();
  usersList:User[] = [];
  managerList:User[] = [];
  profilList:Profil[] = [];

  totalRec!: string;
  page:number=1

  constructor(private formBuilder : FormBuilder, private userService: UserService,  config: NgbModalConfig,
    private modalService: NgbModal, private snackbar:SnackbarService, private dialog: MatDialog,
    private profilService: ProfilService,
    private ngxService: NgxUiLoaderService,private confirmDialogService:ConfirmDialogService
 ) {  
       // customize default values of modals used by this component tree
      config.backdrop = 'static';
      config.keyboard = false;}

  ngOnInit(): void {
   
this.getProfils();
    this.getUsers();
   
  }

  open(content) {
    this.modalService.open(content);
  }

  close(content) {
    this.modalService.dismissAll(content);
  }
  
  addUser(){
    const dialogRef = this.dialog.open(AddUserComponent, {
      disableClose: true,
      
     data :{
      profilList:this.profilList
     },
    
      
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (!isEmpty(result)) {
        console.log('result :: ', result)
  this.userobj.id=result.data.id;
    this.userobj.userName=result.data.userName;
    this.userobj.userPassword=result.data.userPassword;
    this.userobj.email=result.data.email;
    for(var prof of result.data.profil){
     let profil: Profil = new Profil();
      profil.name=prof
      this.userobj.profils.push(profil)
    }
    this.userService.getUserName(this.userDetail.value.userName).subscribe(res=>{
      if(res.id==null){
        this.ngxService.start();
         this.userService.addUser(this.userobj).subscribe(res=>{
          this.snackbar.openSnackBar("Un email est envoyé au nouveau utilisateur contenant ses informations de connexion","")
           console.log("rees:: ",res);
           this.ngxService.stop();
           this.getUsers();
         },
         (error: HttpErrorResponse) => {
           console.log(error.message);
         }
         );
      }
      else {
        this.snackbar.openSnackBar("Nom d'utilisateur déja utilisé","error")
      }
    })
      }
    });  
 
}


  


getProfils(){
  this.profilService.getProfils().subscribe(res=>{
    this.profilList=res;
  })
}

getUsers(){
  this.userService.getUsers().subscribe(res=>{
    this.usersList=res;
  })
}

editUser(User : User){
  this.userDetail.controls['id'].setValue(User.id);
  this.userDetail.controls['userName'].setValue(User.userName);
  this.userDetail.controls['userPassword'].setValue(User.userPassword);
  this.userDetail.controls['email'].setValue(User.email);


 

}

confirmDelete(User: User){
  this.confirmDialogService.confirm('Confirmation','Voulez-vous confirmer cette opération ?').subscribe((res) => {
    if (res){  
      this.userService.deleteUser(User).subscribe(res=>{
        console.log(res);
       this.snackbar.openSnackBar("Utilisateur supprimé","")
        this.getUsers();
      }
      );
   } })
  
  
  }

  /*
  confirmUpdate(User: User){
    this.confirmDialogService.confirm('Confirmation','Voulez-vous confirmer cette opération ?').subscribe((res) => {
      if (res){  
        this.userService.deleteUser(User).subscribe(res=>{
          console.log(res);
         // alert("user deleted successfully");
         this.snackbar.openSnackBar("Utilisateur supprimé","")
          this.getUsers();
        }
        );
     } })
    
    
    }
*/
updateUser(user:User){
  
  const dialogRef = this.dialog.open(EditUserComponent, {
    disableClose: true,
    
   data :{
    user:user,
    profilList:this.profilList
   },
  
    
  });
  dialogRef.afterClosed().subscribe((result) => {
    if (!isEmpty(result)) {
      console.log('user to update :: ',result)
      this.userobj.id=result.data.id;
  this.userobj.userName=result.data.userName;
  this.userobj.userPassword=result.data.userPassword;
  this.userobj.email=result.data.email;
  this.userobj.profils=[]
  for(var prof of result.data.profil){
    let profil: Profil = new Profil();
     profil.name=prof
     this.userobj.profils.push(profil)
   }
   console.log('user  :: ',this.userobj )
     this.userService.updateUser(this.userobj).subscribe(res=>{
      this.snackbar.openSnackBar("Utilisateur modifié","")
    console.log(res);
    this.getUsers();
  }
  );


}
});  

}

// confirmDelete(User: User) {
//   if(confirm("Are you sure you want to delete this user : "+User.userName)) {
//      this.deleteUser(User);
//   }
// }

public searchUsers(key: string): void {
  console.log('hi')
  console.log(key);
  const results: User[] = [];
  for (const user of this.usersList) {
    if (user.userName.toLowerCase().indexOf(key.toLowerCase()) !== -1
    || user.profils.toString().toLowerCase().indexOf(key.toLowerCase()) !== -1
    || user.email.toLowerCase().indexOf(key.toLowerCase()) !== -1
    ) {
      results.push(user);
    }
    console.log('user.profils',user.profils)
    if(user.profils.length>0){
      for (const prof of user.profils){
        
          if(prof.name.toLowerCase().indexOf(key.toLowerCase()) !== -1)
          {
            let exits = false
            results.filter(us=>{
              if(us.id==user.id)
              exits=true
            })
            if(exits==false)
            results.push(user);
          }
          
      }
     }
  }
  this.usersList = results;
  if (key=='') {
    this.getUsers();
  }
}

handleClear(){
  this.userDetail.reset();
}



}