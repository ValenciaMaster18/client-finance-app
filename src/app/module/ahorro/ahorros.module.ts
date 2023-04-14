import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AhorrosRoutingModule } from './ahorros-routing.module';
import { AhorroComponent } from './components/ahorro/ahorro.component';


@NgModule({
  declarations: [
    AhorroComponent
  ],
  imports: [
    CommonModule,
    AhorrosRoutingModule
  ]
})
export class AhorrosModule { }
