import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InversionComponent } from './pages/inversion/inversion.component';
import { MetricasComponent } from './components/metricas/metricas/metricas.component';
import { DetallesComponent } from './components/detalles/detalles/detalles.component';

const routes: Routes = [
  {
    path: '', component: InversionComponent, children: [
      {
        path: 'metricas', component: MetricasComponent
      },
      {
        path: 'detalles/:idPortafolio', component: DetallesComponent
      },
      {
        path: '**', redirectTo: 'metricas', pathMatch: 'full'
      }
    ]
  },
  {
    path: '', redirectTo: 'metricas', pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InversionRoutingModule { }
