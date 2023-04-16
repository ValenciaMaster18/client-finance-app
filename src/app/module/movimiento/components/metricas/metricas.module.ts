import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MetricasRoutingModule } from './metricas-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';

import { MetricasComponent } from './metricas.component';
import { HeaderMetricasComponent } from './header-metricas/header-metricas.component';
import { EgresosComponent } from './egresos/egresos.component';
import { IngresosComponent } from './ingresos/ingresos.component';
import { CrearMovimientoComponent } from './crear-movimiento/crear-movimiento.component';


@NgModule({
  declarations: [
    MetricasComponent,
    EgresosComponent,
    IngresosComponent,
    HeaderMetricasComponent,
    CrearMovimientoComponent
  ],
  imports: [
    CommonModule,
    MetricasRoutingModule,
    ReactiveFormsModule,
    SharedModule

  ]
})
export class MetricasModule { }
