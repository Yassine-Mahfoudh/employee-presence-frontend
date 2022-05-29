import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/core/services/auth.service';
import { UserService } from 'src/app/core/services/user.service';
import { SnackbarService } from 'src/app/shared/service/snackbar.service';
import { ResetpasswordComponent } from '../resetpassword/resetpassword.component';



declare var myfunction: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginError: string;

  constructor(private userService:UserService,
    private authService:AuthService,
    private router: Router,
    private dialog:MatDialog,
    private snackbarService:SnackbarService

    ) { }

  ngOnInit(): void {
  }
  login(loginForm:NgForm){

    this.userService.login(loginForm.value).subscribe(
      (response:any)=>{
        this.loginError = null;

        this.authService.setRoles(response.utilisateur.profils);
        this.authService.setToken(response.jwtToken);
        this.authService.setUsername(response.utilisateur.userName)
        this.authService.setUserEmployee(response.utilisateur.employee)
        this.authService.setUser(response.utilisateur)
        const type = response.utilisateur.profils[0].name;
        console.log( this.loginError );
        if (type === 'ADMIN') {
          this.router.navigate(['/dashboard']);
        } else if(type==='RH'){
        this.router.navigate(['/home']);
      }else{
        this.router.navigate(['/user-calendar']);
      }
      },
      (error)=>{
        this.loginError =" Le nom dutilisateur ou le mot de passe saisi est incorrect !";
        this.snackbarService.openSnackBar( this.loginError,"error");
        console.log(error);
      }
    );
  }

  forgotPasswordAction(){

    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "550px";
    this.dialog.open(ResetpasswordComponent,dialogConfig)
  }
}