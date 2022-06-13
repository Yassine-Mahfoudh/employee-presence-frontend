import { Component, OnInit } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/core/models/user';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

  
  usersList:User[] = [];
  totalRec!: string;
  page:number=1
  constructor( private userService: UserService,  config: NgbModalConfig,
    private modalService: NgbModal) {  
       // customize default values of modals used by this component tree
      config.backdrop = 'static';
      config.keyboard = false;}


  ngOnInit(): void {
    this.getUsers();
   
  }
  open(content) {
    this.modalService.open(content);
  }

  close(content) {
    this.modalService.dismissAll(content);
  }
  getUsers(){
    this.userService.getUsers().subscribe(res=>{
      this.usersList=res;
      console.log(this.usersList)
    })
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
        console.log("user:::",user)
      }
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

}
