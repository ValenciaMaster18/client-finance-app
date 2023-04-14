import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AsesoriaComponent } from './components/asesoria/asesoria.component';

const routes: Routes = [
  {
    path: '', component: AsesoriaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AsesoriasRoutingModule { }
