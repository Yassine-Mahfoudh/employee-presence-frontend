import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/core/models/user';
import { UserService } from 'src/app/core/services/user.service';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})

export class UsersComponent implements OnInit {

  trashIcon = faTrash;
  editIcon = faPenToSquare;
  addIcon = faPlusCircle;

  userDetail!: FormGroup;
  userobj: User = new User();
  usersList:User[] = [];
  totalRec!: string;
  page:number=1

  constructor(private formBuilder5 : FormBuilder, private userService: UserService,  config: NgbModalConfig,
    private modalService: NgbModal) {  
       // customize default values of modals used by this component tree
      config.backdrop = 'static';
      config.keyboard = false;}

  ngOnInit(): void {

    this.getUsers();
    this.userDetail = this.formBuilder5.group({
      id: [''],
      userName: [''],
      userPassword: [''],
      email:['']
    });
  }

  open(content) {
    this.modalService.open(content);
  }

  close(content) {
    this.modalService.dismissAll(content);
  }

  addUser(){

    console.log(this.userDetail);
    this.userobj.id=this.userDetail.value.id;
    this.userobj.userName=this.userDetail.value.userName;
    this.userobj.userPassword=this.userDetail.value.userPassword;
    this.userobj.email=this.userDetail.value.email;
    this.userService.addUser(this.userobj).subscribe(res=>{
      console.log(res);
      this.getUsers();
    }
    );


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
  this.userobj.userPassword=this.userDetail.value.userPassword;
  this.userobj.email=this.userDetail.value.email;
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
    || user.profil.toLowerCase().indexOf(key.toLowerCase()) !== -1
    || user.email.toLowerCase().indexOf(key.toLowerCase()) !== -1
    || user.userPassword.toLowerCase().indexOf(key.toLowerCase()) !== -1
    ) {
      results.push(user);
    }
  }
  this.usersList = results;
  if (results.length === 0 || !key) {
    this.getUsers();
  }
}


}