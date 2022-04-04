import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {

  constructor(
     private authService:AuthService,
     private router:Router,
     public userService:UserService
     ) { }

  ngOnInit(): void {
  }

  public isLoggedIn(){
    return this.authService.isLoggedIn();
  }

  public logout(){
    this.authService.clear();
    this.router.navigate(['/home']);

  }
}
