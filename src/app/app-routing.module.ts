import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/guards/auth.guard';
import { RedirectGuard } from './auth/guards/redirect.guard';

const routes: Routes = [
  {
    path: '', pathMatch: 'full', redirectTo: 'auth'
  },
  {
    path: 'auth', loadChildren: () => import('./auth/auth.module').then( m => m.AuthModule ),
    canActivate: [RedirectGuard]
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboards.module').then( m => m.DashboardsModule),
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    redirectTo: 'auth',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
