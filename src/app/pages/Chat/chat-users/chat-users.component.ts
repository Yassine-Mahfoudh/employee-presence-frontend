import { Component, HostListener, OnInit } from '@angular/core';
import { Message } from 'src/app/core/models/message';
import { User } from 'src/app/core/models/user';
import { AuthService } from 'src/app/core/services/auth.service';
import { UserService } from 'src/app/core/services/user.service';
import { WebSocketService } from 'src/app/core/services/websocket.service';

@Component({
  selector: 'app-chat-users',
  templateUrl: './chat-users.component.html',
  styleUrls: ['./chat-users.component.css']
})
export class ChatUsersComponent   {

  users: User[] = new Array();
  websocket: WebSocket;
  
  constructor(
    private userService: UserService,
    private authService: AuthService,
    private websocketService: WebSocketService
  ) { 

    this.websocket = this.websocketService.createNew();
    this.websocket.onopen = (event: MessageEvent) => {
      let message: Message = {
        type: 'JOINED',
        from: this.authService.getUser().id,
        fromUserName: this.authService.getUsername(),
        message: null
      }
      this.websocket.send(JSON.stringify(message));
    }
    this.initUserList();
    this.startListening();

  }

  startListening() {
    this.websocket.onmessage = (event: MessageEvent) => {
      let message: Message = JSON.parse(event.data);
      if (message.type == 'JOINED') {
        this.setUserStatus(message.from, true);
      } else if (message.type == 'LEFT') {
        this.setUserStatus(message.from, false);
      }
    }
  }

  initUserList() {
    this.userService.getUsers().subscribe(response => {
      this.users = response;
      this.setEachUserOnlineOffline();
    });
  }
  setEachUserOnlineOffline() {
    this.users.forEach(user => user.isOnline = false);
  }

  setUserStatus(userId: Number, isOnline: boolean) {
    let user: User = this.users.find(u => u.id == userId);
    user.isOnline = isOnline;
  }

  @HostListener('window:beforeunload')
  close() {
    let message: Message = {
      type: 'LEFT',
      from: this.authService.getUser().id,
      fromUserName: this.authService.getUsername(),
      message: null
    }
    this.websocket.send(JSON.stringify(message));
  }

}
