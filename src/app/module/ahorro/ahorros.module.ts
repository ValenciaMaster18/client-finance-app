import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AhorrosRoutingModule } from './ahorros-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { AhorroComponent } from './pages/ahorro.component';
import { CrearAhorroComponent } from './components/crear-ahorro/crear-ahorro/crear-ahorro.component';
import { AhorrosComponent } from './components/ahorro/ahorro/ahorro.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AhorroComponent,
    AhorrosComponent,
    CrearAhorroComponent
  ],
  imports: [
    CommonModule,
    AhorrosRoutingModule,
    ReactiveFormsModule,
    SharedModule

  ]
})
export class AhorrosModule { }
