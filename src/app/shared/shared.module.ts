import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ChartModule } from 'primeng/chart';
import { TableModule } from 'primeng/table'
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';

import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoaderComponent } from './components/loader/loader.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { DoughnutComponent } from './components/doughnut/doughnut.component';
import { ConsejoComponent } from './components/mensaje-consejo/consejo.component';
import { CrearMovimientoComponent } from './components/botones/crear-movimiento/crear-movimiento.component';
import { TablaMetMovientoComponent } from './components/tabla-met-moviento/tabla-met-moviento.component';
import { TablaComponent } from './components/tabla-details-movimiento/tabla/tabla.component';
import { CsvDescargarComponent } from './components/botones/descargar-csv/csv-descargar/csv-descargar.component';
@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    SidebarComponent,
    LoaderComponent,
    DoughnutComponent,
    ConsejoComponent,
    CrearMovimientoComponent,
    TablaMetMovientoComponent,
    TablaComponent,
    CsvDescargarComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ChartModule,
    TableModule,
    ButtonModule,
    CarouselModule,
    DialogModule
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
    ChartModule,
    TableModule,
    ButtonModule,
    CarouselModule,
    DialogModule,
    TablaComponent,
    CsvDescargarComponent
  ]
})
export class SharedModule { }
