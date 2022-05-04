import { Component, ViewEncapsulation } from '@angular/core';
import { AuthService } from './core/services/auth.service';
import { HostListener } from "@angular/core";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']})
export class AppComponent {

  title = 'appcrud';
  sideBarOpen = true;

  screenHeight:any;screenWidth:any;

  constructor(private authService:AuthService){
    this.getScreenSize();

  };

  @HostListener('window:resize', ['$event'])
  getScreenSize(event?) {
    this.screenHeight = window.innerHeight;
    this.screenWidth = window.innerWidth;
    //console.log(this.screenHeight, this.screenWidth);
    if(this.screenWidth<1400){
      this.sideBarOpen=false;
    }else{
      this.sideBarOpen=true;

    }
}


  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
}

public isLoggedIn(){
  return this.authService.isLoggedIn();
}
}
