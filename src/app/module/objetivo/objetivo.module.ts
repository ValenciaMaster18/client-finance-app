import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ObjetivoRoutingModule } from './objetivo-routing.module';
import { ObjetivoComponent } from './components/objetivo/objetivo.component';


@NgModule({
  declarations: [
    ObjetivoComponent
  ],
  imports: [
    CommonModule,
    ObjetivoRoutingModule
  ]
})
export class ObjetivoModule { }
