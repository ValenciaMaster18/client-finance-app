import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovimientoRoutingModule } from './movimiento-routing.module';

import { MovimientoComponent } from './pages/movimiento/movimiento.component';
import { DetallesComponent } from './components/detalles/detalles.component';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [
    MovimientoComponent,
    DetallesComponent,
  ],
  imports: [
    CommonModule,
    MovimientoRoutingModule,
    SharedModule
  ]
})
export class MovimientoModule { }
