import { Component } from '@angular/core';
import { MetricaInversion } from 'src/app/shared/model/domain/metricaInversion.model';

@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.component.html',
  styleUrls: ['./detalles.component.scss']
})
export class DetallesComponent {
  mensaje: string = 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry';
  dataMetricaInversion: MetricaInversion[] = []
  visibilidad: boolean = false;

  showDialog(): void{
    this.visibilidad = !this.visibilidad;
  }
}
