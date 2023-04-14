import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InversionRoutingModule } from './inversion-routing.module';
import { InversionComponent } from './components/inversion/inversion.component';


@NgModule({
  declarations: [
    InversionComponent
  ],
  imports: [
    CommonModule,
    InversionRoutingModule
  ]
})
export class InversionModule { }
