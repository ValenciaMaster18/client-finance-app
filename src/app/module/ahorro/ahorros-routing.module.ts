import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AhorroComponent } from './pages/ahorro.component';
import { AhorrosComponent } from './components/ahorro/ahorro/ahorro.component';
import { CrearAhorroComponent } from './components/crear-ahorro/crear-ahorro/crear-ahorro.component';

const routes: Routes = [
  {
    path: '', component: AhorroComponent,children: [
      {
        path: 'ahorro', component: AhorrosComponent
      },
      {
        path: 'crear-ahorro', component: CrearAhorroComponent
      }
      ,
      {
        path: '', redirectTo: 'ahorro', pathMatch: 'full'
      }
    ]
  },
  {
    path: '**', redirectTo: 'ahorro', pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AhorrosRoutingModule { }
