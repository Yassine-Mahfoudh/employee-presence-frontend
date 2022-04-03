import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {

  constructor( private authService:AuthService ) { }

  ngOnInit(): void {
  }

  public isLoggedIn(){
    return this.authService.isLoggedIn();
  }

}
