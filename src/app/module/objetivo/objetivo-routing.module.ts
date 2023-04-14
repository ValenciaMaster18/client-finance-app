import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ObjetivoComponent } from './components/objetivo/objetivo.component';

const routes: Routes = [
  {
    path: '', component: ObjetivoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ObjetivoRoutingModule { }
