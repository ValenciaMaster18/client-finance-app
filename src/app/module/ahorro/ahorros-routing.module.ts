import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AhorroComponent } from './components/ahorro/ahorro.component';

const routes: Routes = [
  {
    path: '', component: AhorroComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AhorrosRoutingModule { }
