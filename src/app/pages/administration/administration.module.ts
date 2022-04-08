import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AdministrationRoutingModule } from './administration-routing.module';
import { LogAccessComponent } from './log-access/log-access.component';
import { LogDataComponent } from './log-data/log-data.component';
import { ProfileComponent } from './profile/profile.component';
import { UsersComponent } from './users/users.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SalleComponent } from './salle/salle.component';
import { NgxPaginationModule } from 'ngx-pagination';

import {MatDialogModule} from '@angular/material/dialog'

@NgModule({
  declarations: [
    LogAccessComponent,
    LogDataComponent,
    ProfileComponent,
    UsersComponent,
    SalleComponent,
  ],
  imports: [
    CommonModule,
    AdministrationRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    MatDialogModule,
    BrowserAnimationsModule
  ]
})
export class AdministrationModule { }
