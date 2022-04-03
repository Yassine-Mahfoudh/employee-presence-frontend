import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { TopbarComponent } from './topbar/topbar.component';
import { VerticalComponent } from './vertical/vertical.component';
import { LayoutsComponent } from './layouts.component';


@NgModule({
  declarations: [
    LayoutsComponent,
    FooterComponent,
    SidebarComponent,
    TopbarComponent,
    VerticalComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    
  ]
})
export class LayoutsModule { }
