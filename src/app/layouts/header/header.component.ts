import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { LogaccessService } from 'src/app/core/services/logaccess.service';
import { UsersService } from 'src/app/core/services/users.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Output() toggleSidebarForMe: EventEmitter<any> = new EventEmitter();

   current = new Date();

  constructor(private router: Router,
    public authService:AuthService) {}

  ngOnInit(): void {}

  toggleSidebar() {
    this.toggleSidebarForMe.emit();
  }

  public logout(){
    this.authService.clear();
    this.router.navigate(['/login']);
  }



  
}
