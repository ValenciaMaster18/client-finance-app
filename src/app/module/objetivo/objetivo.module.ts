import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ObjetivoRoutingModule } from './objetivo-routing.module';
import { ObjetivoComponent } from './components/objetivo/objetivo.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    ObjetivoComponent
  ],
  imports: [
    CommonModule,
    ObjetivoRoutingModule,
    SharedModule
  ]
})
export class ObjetivoModule { }
