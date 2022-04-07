import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  
  //{ path: '', redirectTo: 'dashboard',pathMatch:'full' },
  /*{ path: 'dashboard', component:DashboardComponent },
  { path: 'home', component:HomeComponent },
  { path: 'salle', component:SalleComponent },
  { path: 'admin', component:AdminComponent,canActivate:[AuthGuard],data : {profils:['ADMIN']} },
  { path: 'user', component:UserComponent,canActivate:[AuthGuard],data : {profils:['USER']} },
  { path: 'login', component:LoginComponent },
  { path: 'profil', component:ProfileComponent,canActivate:[AuthGuard],data : {profils:['ADMIN']} },
  { path: 'projet', component:ProjetComponent,canActivate:[AuthGuard],data : {profils:['ADMIN']} },
  { path: 'forbidden', component:ForbiddenComponent }, */

 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
