import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PresupuestoRoutingModule } from './presupuesto-routing.module';
import { PresupuestoComponent } from './pages/presupuesto.component';
import { MetricasComponent } from './components/metricas/metricas.component';
import { DetallesComponent } from './components/detalles/detalles.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormPresupuestoComponent } from './crear-presupuesto/form-presupuesto/form-presupuesto.component';


@NgModule({
  declarations: [
    PresupuestoComponent,
    MetricasComponent,
    DetallesComponent,
    FormPresupuestoComponent
  ],
  imports: [
    CommonModule,
    PresupuestoRoutingModule,
    SharedModule
  ]
})
export class PresupuestoModule { }
