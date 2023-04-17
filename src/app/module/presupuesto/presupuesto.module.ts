import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PresupuestoRoutingModule } from './presupuesto-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

import { PresupuestoComponent } from './pages/presupuesto.component';
import { MetricasComponent } from './components/metricas/metricas.component';
import { DetallesComponent } from './components/detalles/detalles.component';
import { FormPresupuestoComponent } from './components/crear-presupuesto/form-presupuesto/form-presupuesto.component';
import { ReactiveFormsModule } from '@angular/forms';


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
    ReactiveFormsModule,
    SharedModule
  ]
})
export class PresupuestoModule { }
