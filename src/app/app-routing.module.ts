import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { DashboardComponent } from './layouts/dashboard/dashboard.component';
import { AddeventComponent } from './pages/addevent/addevent.component';
import { DemandeComponent } from './pages/administration/demande/demande.component';
import { DepartementListComponent } from './pages/administration/departement-list/departement-list.component';
import { DepartementComponent } from './pages/administration/departement/departement.component';
import { EmployeeListComponent } from './pages/administration/employee-list/employee-list.component';
import { EmployeeComponent } from './pages/administration/employee/employee.component';

import { LogaccessComponent } from './pages/administration/logaccess/logaccess.component';
import { LogdataComponent } from './pages/administration/logdata/logdata.component';
import { MonEquipeComponent } from './pages/administration/mon-equipe/mon-equipe.component';
import { MyaccountComponent } from './pages/administration/myaccount/myaccount.component';
import { ProfilListComponent } from './pages/administration/profil-list/profil-list.component';
import { ProfilComponent } from './pages/administration/profil/profil.component';
import { ProjetListComponent } from './pages/administration/projet-list/projet-list.component';
import { ProjetComponent } from './pages/administration/projet/projet.component';
import { SalleListComponent } from './pages/administration/salle-list/salle-list.component';
import { SalleComponent } from './pages/administration/salle/salle.component';
import { UsersListComponent } from './pages/administration/users-list/users-list.component';
import { UsersComponent } from './pages/administration/users/users.component';
import { ChatComponent } from './pages/Chat/chat/chat.component';

import { EditeventComponent } from './pages/editevent/editevent.component';
import { ForbiddenComponent } from './pages/forbidden/forbidden.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { ResetpasswordComponent } from './pages/resetpassword/resetpassword.component';
import { UserCalendarComponent } from './pages/user-calendar/user-calendar.component';

const routes: Routes = [

  { path: 'login', component: LoginComponent },
  
  { path: 'dashboard', component:DashboardComponent,canActivate:[AuthGuard],data : {profils:['ADMIN']}},
  { path: 'home', component:HomeComponent,canActivate:[AuthGuard],data : {profils:['RH']} },
  { path: 'user-calendar', component:UserCalendarComponent,canActivate:[AuthGuard],data : {profils:['USER','MANAGER']} },
  
 // { path: 'Home', component:HomeComponent,canActivate:[AuthGuard],data : {profils:['USER']} },


  { path: 'forbidden',component:ForbiddenComponent },
  { path: 'resetpassword',component:ResetpasswordComponent },


  { path: 'salle',component:SalleComponent,canActivate:[AuthGuard],data : {profils:['RH']} },
  { path: 'sallelist',component:SalleListComponent,canActivate:[AuthGuard],data : {profils:['ADMIN','USER','MANAGER']} },
  //{ path: 'SalleList',component:SalleListComponent,canActivate:[AuthGuard],data : {profils:['USER']} },


  { path: 'profil',component:ProfilComponent,canActivate:[AuthGuard],data : {profils:['ADMIN']} },
  { path: 'profillist',component:ProfilListComponent,canActivate:[AuthGuard],data : {profils:['RH']} },

  { path: 'projet',component:ProjetComponent,canActivate:[AuthGuard],data : {profils:['RH']} },
  { path: 'projetlist',component:ProjetListComponent,canActivate:[AuthGuard],data : {profils:['ADMIN']} },

  { path: 'departement',component:DepartementComponent,canActivate:[AuthGuard],data : {profils:['RH']} },
  { path: 'departementlist',component:DepartementListComponent,canActivate:[AuthGuard],data : {profils:['ADMIN','USER','MANAGER']} },
 // { path: 'DepartementList',component:DepartementListComponent,canActivate:[AuthGuard],data : {profils:['USER']} },


  { path: 'demande',component:DemandeComponent,canActivate:[AuthGuard],data : {profils:['RH','USER','MANAGER']} },
  //{ path: 'Demande',component:DemandeComponent,canActivate:[AuthGuard],data : {profils:['USER']} },



  { path: 'user',component:UsersComponent,canActivate:[AuthGuard],data : {profils:['ADMIN']} },
  { path: 'userlist',component:UsersListComponent,canActivate:[AuthGuard],data : {profils:['RH']} },

  { path: 'employee',component:EmployeeComponent,canActivate:[AuthGuard],data : {profils:['RH']} },
  { path: 'employeelist',component:EmployeeListComponent,canActivate:[AuthGuard],data : {profils:['ADMIN','USER','MANAGER']} },

 // { path: 'EmployeeList',component:EmployeeListComponent,canActivate:[AuthGuard],data : {profils:['USER']} },

  { path: 'logaccess',component:LogaccessComponent,canActivate:[AuthGuard],data : {profils:['ADMIN']} },
  { path: 'logdata',component:LogdataComponent,canActivate:[AuthGuard],data : {profils:['ADMIN']} },


  { path: 'myAccount',component:MyaccountComponent },

  { path: 'addevent',component:AddeventComponent },

  { path: 'editevent',component:EditeventComponent },

  { path: 'monequipe',component:MonEquipeComponent,canActivate:[AuthGuard],data : {profils:['MANAGER']} },


  



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
