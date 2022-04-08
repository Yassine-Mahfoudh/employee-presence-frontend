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
import { SalleComponent } from './salles/salle/salle.component';
import { SalleListComponent } from './salles/salle-list/salle-list.component';
import { SallesComponent } from './salles/salles.component';


@NgModule({
  declarations: [
    LogAccessComponent,
    LogDataComponent,
    ProfileComponent,
    UsersComponent,
    SalleComponent,
    SalleListComponent,
    SallesComponent
  ],
  imports: [
    CommonModule,
    AdministrationRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    MatDialogModule,
    MatCardModule,
    MatIconModule,
    MatToolbarModule,
    BrowserAnimationsModule
  ]
})
export class AdministrationModule { }
