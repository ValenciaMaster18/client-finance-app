import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AsesoriaComponent } from './pages/asesoria.component';
import { BlogsComponent } from './components/blogs/blogs/blogs.component';
import { AsesorComponent } from './components/asesoria/asesoria/asesoria.component';

const routes: Routes = [
  {
    path: '', component: AsesoriaComponent, children: [
      {
        path: 'blogs', component: BlogsComponent
      },
      {
        path: 'asesor', component: AsesorComponent
      },
      {
        path: '', redirectTo: 'blogs', pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AsesoriasRoutingModule { }
