import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { UserService } from 'src/app/core/services/user.service';



declare var myfunction: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  


  constructor(private userService:UserService,
    private authService:AuthService,
    private router: Router
    ) { }

  ngOnInit(): void {
  }
  login(loginForm:NgForm){

    this.userService.login(loginForm.value).subscribe(
      (response:any)=>{
        this.authService.setRoles(response.utilisateur.profils);
        this.authService.setToken(response.jwtToken);
        this.authService.setUsername(response.utilisateur.userName)

        const type = response.utilisateur.profils[0].name;
        if (type === 'ADMIN') {
          this.router.navigate(['/dashboard']);
        } else {
          this.router.navigate(['/home']);
        }
      },
      (error)=>{
        console.log(error);
      }
    );
  }
}
