import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ObjetivoRoutingModule } from './objetivo-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ObjetivoComponent } from './components/objetivo/objetivo.component';
import { CrearObjetivoComponent } from './components/crear-objetivo/crear-objetivo.component';
import { ObjetivosComponent } from './pages/objetivos/objetivos.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ObjetivoComponent,
    CrearObjetivoComponent,
    ObjetivosComponent
  ],
  imports: [
    CommonModule,
    ObjetivoRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule
  ]
})
export class ObjetivoModule { }
