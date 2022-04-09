import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AdministrationRoutingModule } from './administration-routing.module';
import { LogAccessComponent } from './log-access/log-access.component';
import { LogDataComponent } from './log-data/log-data.component';
import { ProfileComponent } from './profile/profile.component';
import { UsersComponent } from './users/users.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

import {MatCardModule} from '@angular/material/card';
import { SalleComponent } from './salle/salle.component';
import { ModalFormComponentComponent } from './modal-form-component/modal-form-component.component';


import { ModalModule } from "ngx-bootstrap/modal";

@NgModule({
  declarations: [
    LogAccessComponent,
    LogDataComponent,
    ProfileComponent,
    UsersComponent,
    SalleComponent,
    ModalFormComponentComponent,
 
  ],
  imports: [
    CommonModule,
    AdministrationRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,

    ModalModule.forRoot(),
    //MatDialogModule,
    //MatCardModule,
   // MatIconModule,
    //MatToolbarModule,
    BrowserAnimationsModule,
  ]
})
export class AdministrationModule { }
