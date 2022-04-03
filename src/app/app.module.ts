import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PostComponent } from './components/post/post.component';
import {HttpClientModule} from '@angular/common/http';
import { SalleComponent } from './components/salle/salle.component';
import { FormsModule } from '@angular/forms';
import { LayoutsModule } from './layouts/layouts.module';
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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
