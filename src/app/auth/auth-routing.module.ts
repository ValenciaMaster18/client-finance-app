import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthComponent } from './pages/auth/auth.component';

const routes: Routes = [
  {
    path: '', component: AuthComponent, children: [
      {
        path: 'login', component: LoginComponent
      },
      {
        path: 'login/:username', component: LoginComponent
      },
      {
        path: 'register', component: RegisterComponent
      },
      {
        path: 'register/:username', component: RegisterComponent
      },
      {
        path: '', redirectTo: 'login', pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
