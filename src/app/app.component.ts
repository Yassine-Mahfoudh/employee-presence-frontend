import { Component, ViewEncapsulation } from '@angular/core';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']})
export class AppComponent {

  constructor(private authService:AuthService){};

  title = 'appcrud';
  sideBarOpen = true;

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
}

public isLoggedIn(){
  return this.authService.isLoggedIn();
}
}
