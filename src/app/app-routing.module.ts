import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/components/login/login.component';
import { RegisterComponent } from './auth/components/register/register.component';

const routes: Routes = [
  {
    path: '', pathMatch: 'full', redirectTo: 'auth'
  },
  {
    path: 'auth', loadChildren: () => import('./auth/auth.module').then( m => m.AuthModule )
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
