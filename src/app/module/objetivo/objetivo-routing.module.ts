import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ObjetivoComponent } from './components/objetivo/objetivo.component';
import { CrearObjetivoComponent } from './components/crear-objetivo/crear-objetivo.component';
import { ObjetivosComponent } from './pages/objetivos/objetivos.component';

const routes: Routes = [
  {
    path: '', component: ObjetivosComponent, children: [
      {
        path: 'objetivo', component: ObjetivoComponent
      },
      {
        path: 'crear-objetivo', component: CrearObjetivoComponent
      },
      {
        path: '', redirectTo: 'objetivo', pathMatch: 'full'
      }
    ]
  },
  {
    path: '**', redirectTo: 'objetivo', pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ObjetivoRoutingModule { }
