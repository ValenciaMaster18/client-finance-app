import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoaderComponent } from './components/loader/loader.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { DoughnutComponent } from './components/doughnut/doughnut.component';
import { ChartModule } from 'primeng/chart';
import { ConsejoComponent } from './components/mensaje-consejo/consejo.component';
@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    SidebarComponent,
    LoaderComponent,
    DoughnutComponent,
    ConsejoComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ChartModule
    ],
  exports: [
    NavbarComponent,
    FooterComponent,
    SidebarComponent,
    LoaderComponent,
    DoughnutComponent,
    ConsejoComponent
  ]
})
export class SharedModule { }
