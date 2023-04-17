import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AsesoriasRoutingModule } from './asesorias-routing.module';
import { AsesoriaComponent } from './pages/asesoria.component';
import { BlogsComponent } from './components/blogs/blogs/blogs.component';
import { AsesorComponent } from './components/asesoria/asesoria/asesoria.component';


@NgModule({
  declarations: [
    AsesoriaComponent,
    BlogsComponent,
    AsesorComponent
  ],
  imports: [
    CommonModule,
    AsesoriasRoutingModule
  ]
})
export class AsesoriasModule { }
