import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PostComponent } from './components/post/post.component';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { JwtInterceptor } from './core/helpers/jwt.interceptor';
import { AuthGuard } from './core/guards/auth.guard';
import { UserService } from './core/services/user.service';
import { EditSalleComponent } from './components/salle/edit-salle/edit-salle.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import{MatSidenavModule} from '@angular/material/sidenav';
import{MatToolbarModule} from '@angular/material/toolbar'
import{MatMenuModule} from '@angular/material/menu'
import{MatListModule} from '@angular/material/list'
import{MatIconModule} from '@angular/material/icon'
import{MatDividerModule} from '@angular/material/divider'
import { HeaderComponent } from './layouts/header/header.component';
import { HomeComponent } from './pages/home/home.component';
import { SidenavComponent } from './layouts/sidenav/sidenav.component';
import { DashboardComponent } from './layouts/dashboard/dashboard.component';

import { ForbiddenComponent } from './pages/forbidden/forbidden.component';
import { SharedModule } from './shared/shared.module';
import { AdministrationModule } from './pages/administration/administration.module';
import { PagesModule } from './pages/pages.module';




@NgModule({
  declarations: [
    AppComponent,
    PostComponent,
    EditSalleComponent,

    HeaderComponent,
    HomeComponent,
    DashboardComponent,
    SidenavComponent,
    ForbiddenComponent,
    

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    SharedModule,
    //AdministrationModule,
    PagesModule,
      

        // * MATERIAL IMPORTS
    MatSidenavModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatDividerModule,
    MatListModule,



  



  ],
  providers: [
    AuthGuard,
    {   provide: HTTP_INTERCEPTORS,
        useClass: JwtInterceptor,
        multi: true
      },
      UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
