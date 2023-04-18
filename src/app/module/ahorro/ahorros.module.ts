import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AhorrosRoutingModule } from './ahorros-routing.module';
import { AhorroComponent } from './components/ahorro/ahorro.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    AhorroComponent
  ],
  imports: [
    CommonModule,
    AhorrosRoutingModule,
    SharedModule

  ]
})
export class AhorrosModule { }
