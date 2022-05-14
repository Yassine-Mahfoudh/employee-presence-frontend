import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { JwtInterceptor } from './core/helpers/jwt.interceptor';
import { AuthGuard } from './core/guards/auth.guard';
import { UserService } from './core/services/user.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import{MatSidenavModule} from '@angular/material/sidenav';
import{MatToolbarModule} from '@angular/material/toolbar'
import{MatMenuModule} from '@angular/material/menu'
import{MatListModule} from '@angular/material/list'
import{MatIconModule} from '@angular/material/icon'
import{MatDividerModule} from '@angular/material/divider'
import { HeaderComponent } from './layouts/header/header.component';
import { SidenavComponent } from './layouts/sidenav/sidenav.component';
import { DashboardComponent } from './layouts/dashboard/dashboard.component';

import { ForbiddenComponent } from './pages/forbidden/forbidden.component';
import { SharedModule } from './shared/shared.module';
import { PagesModule } from './pages/pages.module';


import {MatCardModule} from '@angular/material/card';
import {MatTabsModule} from '@angular/material/tabs';

import { NgxUiLoaderModule,NgxUiLoaderConfig,SPINNER,PB_DIRECTION } from "ngx-ui-loader";
import { FooterComponent } from './layouts/footer/footer.component';



const ngxUiLoaderConfig:NgxUiLoaderConfig = {
  text:"Loading...",
  textColor:"#ffffff",
  textPosition:"center-center",
  pbColor:"blue",
  bgsColor:"blue",
  fgsColor:"blue",
  fgsType:SPINNER.doubleBounce,
  fgsSize:100,
  pbDirection:PB_DIRECTION.leftToRight,
  pbThickness:5
}


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DashboardComponent,
    SidenavComponent,
    ForbiddenComponent,
    FooterComponent,
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
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),


        // * MATERIAL IMPORTS
    MatSidenavModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatDividerModule,
    MatListModule,
    MatCardModule,
    MatIconModule,
    MatToolbarModule,
    MatTabsModule,

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
