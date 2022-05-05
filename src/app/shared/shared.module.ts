import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { LoginComponent } from '../pages/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DeleteComponent } from './constant/delete/delete.component';
import{MatToolbarModule} from '@angular/material/toolbar'
import {MatDialogModule} from '@angular/material/dialog';



@NgModule({
  declarations: [
    LoginComponent,
    DeleteComponent,
    
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatDialogModule
  ],
  exports: [
    LoginComponent,
  ]
})
export class SharedModule { }
