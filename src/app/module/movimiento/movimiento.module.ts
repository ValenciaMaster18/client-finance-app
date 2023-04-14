import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MovimientoRoutingModule } from './movimiento-routing.module';
import { MovimientoComponent } from './components/movimiento/movimiento.component';


@NgModule({
  declarations: [
    MovimientoComponent
  ],
  imports: [
    CommonModule,
    MovimientoRoutingModule
  ]
})
export class MovimientoModule { }
