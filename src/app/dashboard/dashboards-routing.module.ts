import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '', component: DashboardComponent, children: [
      {
        path: 'panel', loadChildren: () => import('../module/panel/panel.module').then(m => m.PanelModule)
      },
      {
        path: 'movimiento', loadChildren: () => import('../module/movimiento/movimiento.module').then(m => m.MovimientoModule)
      },
      {
        path: 'ahorro', loadChildren: () => import('../module/ahorro/ahorros.module').then(m => m.AhorrosModule)
      },
      {
        path: 'presupuesto', loadChildren: () => import('../module/presupuesto/presupuesto.module').then(m => m.PresupuestoModule)
      },
      {
        path: 'objetivo', loadChildren: () => import('../module/objetivo/objetivo.module').then(m => m.ObjetivoModule)
      },
      {
        path: 'inversion', loadChildren: () => import('../module/inversion/inversion.module').then(m => m.InversionModule)
      },
      {
        path: 'asesoria', loadChildren: () => import('../module/asesoria/asesorias.module').then(m => m.AsesoriasModule)
      },
      {
        path: '', redirectTo: 'panel', pathMatch: 'full'
      },
      {
        path: '**', redirectTo: 'panel', pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardsRoutingModule { }
