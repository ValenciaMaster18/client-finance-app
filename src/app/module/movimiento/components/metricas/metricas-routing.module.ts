import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MetricasComponent } from './metricas.component';
import { IngresosComponent } from './ingresos/ingresos.component';
import { EgresosComponent } from './egresos/egresos.component';
import { CrearMovimientoComponent } from './crear-movimiento/crear-movimiento.component';

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
        path: 'crear-movimiento/:tipo', component: CrearMovimientoComponent
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
