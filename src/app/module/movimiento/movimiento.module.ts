import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MovimientoRoutingModule } from './movimiento-routing.module';
import { MovimientoComponent } from './pages/movimiento/movimiento.component';
import { MetricasComponent } from './components/metricas/metricas.component';
import { DetallesComponent } from './components/detalles/detalles.component';
import { IngresosComponent } from './components/metricas/ingresos/ingresos.component';
import { EgresosComponent } from './components/metricas/egresos/egresos.component';
import { SharedModule } from '../../shared/shared.module';
import { HeaderMetricasComponent } from './components/metricas/header-metricas/header-metricas.component';


@NgModule({
  declarations: [
    MovimientoComponent,
    MetricasComponent,
    DetallesComponent,
    IngresosComponent,
    EgresosComponent,
    HeaderMetricasComponent
  ],
  imports: [
    CommonModule,
    MovimientoRoutingModule,
    SharedModule
  ]
})
export class MovimientoModule { }
