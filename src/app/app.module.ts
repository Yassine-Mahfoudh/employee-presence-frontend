import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PostComponent } from './components/post/post.component';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { SalleComponent } from './components/salle/salle.component';
import { FormsModule } from '@angular/forms';
import { LayoutsModule } from './layouts/layouts.module';
import { JwtInterceptor } from './core/helpers/jwt.interceptor';
import { AuthGuard } from './core/guards/auth.guard';
import { UserService } from './core/services/user.service';
@NgModule({
  declarations: [
    AppComponent,
    PostComponent,
    SalleComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    LayoutsModule
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
