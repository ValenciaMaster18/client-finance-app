import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ChartModule } from 'primeng/chart';
import { TableModule } from 'primeng/table'


import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoaderComponent } from './components/loader/loader.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { DoughnutComponent } from './components/doughnut/doughnut.component';
import { ConsejoComponent } from './components/mensaje-consejo/consejo.component';
import { CrearMovimientoComponent } from './components/botones/crear-movimiento/crear-movimiento.component';
import { TablaMetMovientoComponent } from './components/tabla-met-moviento/tabla-met-moviento.component';
@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    SidebarComponent,
    LoaderComponent,
    DoughnutComponent,
    ConsejoComponent,
    CrearMovimientoComponent,
    TablaMetMovientoComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ChartModule,
    TableModule
    ],
  exports: [
    NavbarComponent,
    FooterComponent,
    SidebarComponent,
    LoaderComponent,
    DoughnutComponent,
    ConsejoComponent,
    CrearMovimientoComponent,
    TablaMetMovientoComponent,
    TableModule
  ]
})
export class SharedModule { }
