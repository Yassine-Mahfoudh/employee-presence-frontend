import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AdministrationRoutingModule } from './administration-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

import { SalleComponent } from './salle/salle.component';
import { ModalModule } from "ngx-bootstrap/modal";
import { ProfilComponent } from './profil/profil.component';
import { ProfilListComponent } from './profil-list/profil-list.component';
import { SalleListComponent } from './salle-list/salle-list.component';
import { ProjetComponent } from './projet/projet.component';
import { ProjetListComponent } from './projet-list/projet-list.component';
import { DepartementComponent } from './departement/departement.component';
import { DepartementListComponent } from './departement-list/departement-list.component';
import { DemandeComponent } from './demande/demande.component';
import { UsersListComponent } from './users-list/users-list.component';
import { EmployeeComponent } from './employee/employee.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { LogaccessComponent } from './logaccess/logaccess.component';
import { UsersComponent } from './users/users.component';
import { MyaccountComponent } from './myaccount/myaccount.component';
import {MatTabsModule} from '@angular/material/tabs';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'

import{MatIconModule} from '@angular/material/icon'

import {MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input';
import { FlexLayoutModule } from '@angular/flex-layout';
import{MatToolbarModule} from '@angular/material/toolbar';
import { MatDialogModule } from '@angular/material/dialog';
import { LogdataComponent } from './logdata/logdata.component'
import { SortDirective } from 'src/app/shared/Utils/directive/sort.directive';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatSelectModule} from '@angular/material/select';
import {MatRadioModule} from '@angular/material/radio';
import { DialogConfirmationComponent } from './dialog-confirmation/dialog-confirmation.component';
import { AddUserComponent } from './users/add-user/add-user.component';
import { TextFieldComponent } from './text-field/text-field.component';
import { EditUserComponent } from './users/edit-user/edit-user.component';
import { AddDepartementComponent } from './departement/add-departement/add-departement.component';
import { EditDepartementComponent } from './departement/edit-departement/edit-departement.component';
import { AddSalleComponent } from './salle/add-salle/add-salle.component';
import { EditSalleComponent } from './salle/edit-salle/edit-salle.component';
import { AddProjetComponent } from './projet/add-projet/add-projet.component';
import { EditProjetComponent } from './projet/edit-projet/edit-projet.component';
import { EditEmployeeComponent } from './employee/edit-employee/edit-employee.component';
import { EditProfilComponent } from './profil/edit-profil/edit-profil.component';
import { MatCardModule } from '@angular/material/card';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { UploadImagesComponent } from './upload-images/upload-images.component';


import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatListModule } from '@angular/material/list';
import { MonEquipeComponent } from './mon-equipe/mon-equipe.component';
import { EditDemandeComponent } from './demande/edit-demande/edit-demande.component';
import { MatPaginatorIntl } from '@angular/material/paginator/paginator-intl';

@NgModule({
  declarations: [
    ProfilComponent,
    UsersComponent,
    SalleComponent,
    ProfilListComponent,
    SalleListComponent,
    ProjetComponent,
    ProjetListComponent,
    DepartementComponent,
    DepartementListComponent,
    DemandeComponent,
    UsersListComponent,
    EmployeeComponent,
    EmployeeListComponent,
    LogaccessComponent,
    MyaccountComponent,
    LogdataComponent,
    SortDirective,
    DialogConfirmationComponent,
    AddUserComponent,
    TextFieldComponent,
    EditUserComponent,
    AddDepartementComponent,
    EditDepartementComponent,
    AddSalleComponent,
    EditSalleComponent,
    EditDemandeComponent,
    AddProjetComponent,
    EditProjetComponent,
MonEquipeComponent,
    EditEmployeeComponent,
     EditProfilComponent,
     UploadImagesComponent
 
  ],
  imports: [
    CommonModule,
    AdministrationRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    MatGridListModule ,
    ModalModule.forRoot(),
    //MatDialogModule,
    //MatCardModule,
   // MatIconModule,
    //MatToolbarModule,
    BrowserAnimationsModule,
    MatTabsModule,
    FontAwesomeModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatDialogModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,

    MatButtonModule,
    MatProgressBarModule,
    MatListModule

  ]
})
export class AdministrationModule { }
