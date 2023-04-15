import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MetricasComponent } from './metricas.component';
import { IngresosComponent } from './ingresos/ingresos.component';
import { EgresosComponent } from './egresos/egresos.component';

const routes: Routes = [
  {
    path: '', component: MetricasComponent, children: [
      {
        path: 'ingresos', component: IngresosComponent
      },
      {
        path: 'egreso', component: EgresosComponent
      },
      {
        path: '', redirectTo: 'ingresos' , pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MetricasRoutingModule { }
