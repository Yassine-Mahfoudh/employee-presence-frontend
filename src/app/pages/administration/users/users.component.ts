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
    private modalService: NgbModal, private snackbar:SnackbarService,
    private profilService: ProfilService,
    private ngxService: NgxUiLoaderService,

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

    console.log(this.userDetail);
    console.log('this.userDetail.value.profil ::',this.userDetail.value.profil)
    this.userobj.id=this.userDetail.value.id;
    this.userobj.userName=this.userDetail.value.userName;
    this.userobj.userPassword=this.userDetail.value.userPassword;
    this.userobj.email=this.userDetail.value.email;
    for(var prof of this.userDetail.value.profil){
     let profil: Profil = new Profil();
      profil.name=prof
      this.userobj.profils.push(profil)
    }
    console.log('user to add',this.userobj);
    this.userService.getUserName(this.userDetail.value.userName).subscribe(res=>{
      console.log('user check ::: ',res)
      if(res.id==null){
       
        this.ngxService.start();
         this.userService.addUser(this.userobj).subscribe(res=>{
           console.log(res);
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

deleteUser(User : User){

    this.userService.deleteUser(User).subscribe(res=>{
      console.log(res);
      alert("user deleted successfully");
      this.getUsers();
    }
    );
  
  }

updateUser(){
  this.userobj.id=this.userDetail.value.id;
  this.userobj.userName=this.userDetail.value.userName;
  this.userobj.userPassword=this.userobj.userPassword;
  this.userobj.email=this.userDetail.value.email;
  for(var prof of this.userDetail.value.profil){
    let profil: Profil = new Profil();
     profil.name=prof
     this.userobj.profils.push(profil)
   }
   console.log('user to update :: ',this.userobj )
     this.userService.updateUser(this.userobj).subscribe(res=>{
    console.log(res);
    this.getUsers();
  }
  );

}

confirmDelete(User: User) {
  if(confirm("Are you sure you want to delete this user : "+User.userName)) {
     this.deleteUser(User);
  }
}

public searchUsers(key: string): void {
  console.log(key);
  const results: User[] = [];
  for (const user of this.usersList) {
    if (user.userName.toLowerCase().indexOf(key.toLowerCase()) !== -1
    || user.profils.toString().toLowerCase().indexOf(key.toLowerCase()) !== -1
    || user.email.toLowerCase().indexOf(key.toLowerCase()) !== -1
    ) {
      results.push(user);
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