import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovimientoComponent } from './pages/movimiento/movimiento.component';
import { DetallesComponent } from './components/detalles/detalles.component';

const routes: Routes = [
  {
    path: '', component: MovimientoComponent, children: [
      {
        path: 'metricas',
        loadChildren: () => import('./components/metricas/metricas.module').then(m => m.MetricasModule)
      },
      {
        path: 'details', component: DetallesComponent
      },
      {
        path: '', redirectTo: 'metricas', pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MovimientoRoutingModule { }
