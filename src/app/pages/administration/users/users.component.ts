import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Users } from 'src/app/core/models/users';
import { UsersService } from 'src/app/core/services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})

export class UsersComponent implements OnInit {

  usersDetail!: FormGroup;
  usersobj: Users = new Users();
  usersList:Users[] = [];
  totalRec!: string;
  page:number=1

  constructor(private formBuilder5 : FormBuilder, private usersService: UsersService,  config: NgbModalConfig,
    private modalService: NgbModal) {  
       // customize default values of modals used by this component tree
      config.backdrop = 'static';
      config.keyboard = false;}

  ngOnInit(): void {

    this.getUsers();
    this.usersDetail = this.formBuilder5.group({
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

  addUsers(){

    console.log(this.usersDetail);
    this.usersobj.id=this.usersDetail.value.id;
    this.usersobj.userName=this.usersDetail.value.userName;
    this.usersobj.userPassword=this.usersDetail.value.userPassword;
    this.usersobj.email=this.usersDetail.value.email;
    this.usersService.addUsers(this.usersobj).subscribe(res=>{
      console.log(res);
      this.getUsers();
    }
    );


}

getUsers(){
  this.usersService.getUsers().subscribe(res=>{
    this.usersList=res;
  })
}

editUsers(Users : Users){
  this.usersDetail.controls['id'].setValue(Users.id);
  this.usersDetail.controls['userName'].setValue(Users.userName);
  this.usersDetail.controls['userPassword'].setValue(Users.userPassword);
  this.usersDetail.controls['email'].setValue(Users.email);
}

deleteUsers(Users : Users){

    this.usersService.deleteUsers(Users).subscribe(res=>{
      console.log(res);
      alert("user deleted successfully");
      this.getUsers();
    }
    );
  
  }

updateUsers(){
  this.usersobj.id=this.usersDetail.value.id;
  this.usersobj.userName=this.usersDetail.value.userName;
  this.usersobj.userPassword=this.usersDetail.value.userPassword;
  this.usersobj.email=this.usersDetail.value.email;
  this.usersService.updateUsers(this.usersobj).subscribe(res=>{
    console.log(res);
    this.getUsers();
  }
  );

}

confirmDelete(Users: Users) {
  if(confirm("Are you sure you want to delete this user : "+Users.userName)) {
     this.deleteUsers(Users);
  }
}


}