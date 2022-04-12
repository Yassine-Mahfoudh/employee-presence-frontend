import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { DashboardComponent } from './layouts/dashboard/dashboard.component';
import { DemandeListComponent } from './pages/administration/demande-list/demande-list.component';
import { DemandeComponent } from './pages/administration/demande/demande.component';
import { DepartementListComponent } from './pages/administration/departement-list/departement-list.component';
import { DepartementComponent } from './pages/administration/departement/departement.component';
import { EmployeeListComponent } from './pages/administration/employee-list/employee-list.component';
import { EmployeeComponent } from './pages/administration/employee/employee.component';
import { FonctionaliteListComponent } from './pages/administration/fonctionalite-list/fonctionalite-list.component';
import { FonctionaliteComponent } from './pages/administration/fonctionalite/fonctionalite.component';
import { LogaccessComponent } from './pages/administration/logaccess/logaccess.component';
import { ModalFormComponentComponent } from './pages/administration/modal-form-component/modal-form-component.component';
import { MyaccountComponent } from './pages/administration/myaccount/myaccount.component';
import { ProfilListComponent } from './pages/administration/profil-list/profil-list.component';
import { ProfilComponent } from './pages/administration/profil/profil.component';
import { ProjetListComponent } from './pages/administration/projet-list/projet-list.component';
import { SalleListComponent } from './pages/administration/salle-list/salle-list.component';
import { SalleComponent } from './pages/administration/salle/salle.component';
import { UsersListComponent } from './pages/administration/users-list/users-list.component';
import { UsersComponent } from './pages/administration/users/users.component';
import { ForbiddenComponent } from './pages/forbidden/forbidden.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [
  //{ path: 'account', loadChildren: () => import('./account/account.module').then(m => m.AccountModule) },
  // tslint:disable-next-line: max-line-length
 // { path: '', component: LayoutsComponent, loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule)},
 // { path: '', loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule)},//, canActivate: [AuthGuard] },

  //{ path: '', component:HomeComponent,canActivate:[AuthGuard],data : {profils:['USER']} },
  //{ path: 'home', component:HomeComponent,canActivate:[AuthGuard],data : {profils:['USER']} },

  { path: '', component:DashboardComponent,canActivate:[AuthGuard],data : {profils:['ADMIN']}},
  { path: '', component:HomeComponent,canActivate:[AuthGuard],data : {profils:['RH']} },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component:DashboardComponent,canActivate:[AuthGuard],data : {profils:['ADMIN']}},
  { path: 'home', component:HomeComponent,canActivate:[AuthGuard],data : {profils:['RH']} },
  { path: 'forbidden',component:ForbiddenComponent },
  { path: 'salle',component:SalleComponent },
  { path: 'sallelist',component:SalleListComponent },
  { path: 'profil',component:ProfilComponent },
  { path: 'profillist',component:ProfilListComponent },
  { path: 'projet',component:ProfilComponent },
  { path: 'projetlist',component:ProjetListComponent },
  { path: 'departement',component:DepartementComponent },
  { path: 'departementlist',component:DepartementListComponent },
  { path: 'demande',component:DemandeComponent },
  { path: 'demandelist',component:DemandeListComponent },
  { path: 'user',component:UsersComponent },
  { path: 'userlist',component:UsersListComponent },
  { path: 'employee',component:EmployeeComponent },
  { path: 'employeelist',component:EmployeeListComponent },
  { path: 'fonctionalite',component:FonctionaliteComponent },
  { path: 'fonctionalitelist',component:FonctionaliteListComponent},
  { path: 'logaccess',component:LogaccessComponent },
  { path: 'modal',component:ModalFormComponentComponent },
  { path: 'myAccount',component:MyaccountComponent }

  



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
