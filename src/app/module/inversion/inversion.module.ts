import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InversionRoutingModule } from './inversion-routing.module';
import { InversionComponent } from './pages/inversion/inversion.component';
import { MetricasComponent } from './components/metricas/metricas/metricas.component';
import { DetallesComponent } from './components/detalles/detalles/detalles.component';
import { CrearInversionComponent } from './components/crear-inversion/crear-inversion/crear-inversion.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    InversionComponent,
    MetricasComponent,
    DetallesComponent,
    CrearInversionComponent
  ],
  imports: [
    CommonModule,
    InversionRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule
  ]
})
export class InversionModule { }
