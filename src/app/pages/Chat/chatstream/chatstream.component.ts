import { Component, OnInit } from '@angular/core';
import { Message } from 'src/app/core/models/message';
import { AuthService } from 'src/app/core/services/auth.service';
import { WebSocketService } from 'src/app/core/services/websocket.service';

@Component({
  selector: 'chat-stream',
  templateUrl: './chatstream.component.html',
  styleUrls: ['./chatstream.component.css']
})
export class ChatstreamComponent  {

  message: string = ''; 
  publishedMessage: Message[] = new Array();
  showTypingIndicator: boolean = false;
  typingUser: string;
  loggedinUserId: number;
  websocket: WebSocket;
  
  constructor(
    private authService : AuthService,
    private websocketService : WebSocketService
    ) {

      this.websocket = this.websocketService.createNew();
    this.loggedinUserId = this.authService.getUser().id;
    this.startListening();
     }

     startListening() {
      this.websocket.onmessage = (event: MessageEvent) => {
        let message: Message = JSON.parse(event.data);
        if (message.type == 'MESSAGE') {
          this.publishedMessage.push(message);
        } else if (message.type == 'TYPING') {
          if (message.from != this.loggedinUserId) {
            this.showUserTypingIndicator(message.fromUserName);
          }
        }
      };
    }
 
    sendMessage() {
      let msg = this.message;
      if (msg == '' || msg == undefined) return;
  
      let message: Message = {
        type: 'MESSAGE',
        from: this.authService.getUser().id,
        fromUserName: this.authService.getUsername(),
        message: msg
      }
      this.websocket.send(JSON.stringify(message));
      this.message = '';
    }

    sendTypeIndicator() {
      let message: Message = {
        type: 'TYPING',
        from: this.authService.getUser().id,
        fromUserName: this.authService.getUsername(),
        message: null
      }
      this.websocket.send(JSON.stringify(message));
    }

    showUserTypingIndicator(userName: string) {
      this.typingUser = userName;
      this.showTypingIndicator = true;
      setTimeout(() => {
        this.hideUserTypingIndicator();
      }, 1000);
    }
    
  hideUserTypingIndicator() {
    if (this.showTypingIndicator) {
      this.showTypingIndicator = false;
    }
  }

}
