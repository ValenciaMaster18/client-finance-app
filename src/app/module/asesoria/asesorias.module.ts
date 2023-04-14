import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AsesoriasRoutingModule } from './asesorias-routing.module';
import { AsesoriaComponent } from './components/asesoria/asesoria.component';


@NgModule({
  declarations: [
    AsesoriaComponent
  ],
  imports: [
    CommonModule,
    AsesoriasRoutingModule
  ]
})
export class AsesoriasModule { }
