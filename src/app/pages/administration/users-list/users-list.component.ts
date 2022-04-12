import { Component, OnInit } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Users } from 'src/app/core/models/users';
import { UsersListService } from 'src/app/core/services/users-list.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
  usersList:Users[] = [];
  totalRec!: string;
  page:number=1
  constructor( private usersListService: UsersListService,  config: NgbModalConfig,
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
    this.usersListService.getUsers().subscribe(res=>{
      this.usersList=res;
    })
  }

}
