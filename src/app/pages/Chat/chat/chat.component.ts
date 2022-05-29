import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  loggedInUser: String;

  constructor(private authService : AuthService) { 
    this.loggedInUser=authService.getUsername();
  }

  ngOnInit(): void {
  }

}
