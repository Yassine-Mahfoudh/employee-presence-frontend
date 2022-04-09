import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { DashboardComponent } from './layouts/dashboard/dashboard.component';
import { ModalFormComponentComponent } from './pages/administration/modal-form-component/modal-form-component.component';
import { SalleComponent } from './pages/administration/salle/salle.component';
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
  { path: 'modal',component:ModalFormComponentComponent },

  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
