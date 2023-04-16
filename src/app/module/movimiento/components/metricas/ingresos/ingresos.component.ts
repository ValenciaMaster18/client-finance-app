import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MetricaBalance } from 'src/app/shared/model/domain/metricabalance.model';
import { MovimientoService } from 'src/app/shared/services/movimientos/movimiento.service';

@Component({
  selector: 'app-ingresos',
  templateUrl: './ingresos.component.html',
  styleUrls: ['../../../../../../assets/css/movimiento/egre-ingre.scss']
})
export class IngresosComponent implements OnInit {
  mensaje: string = 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry';
  dataParaGrafico!: MetricaBalance;
  dataGrafico: any;
  optionsGrafico: any;

  // Finalizar la suscripcion
  subscription: Subscription;
  constructor(
    private _movimientoService: MovimientoService
  ) {
    this.subscription = new Subscription();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
  ngOnInit() {
    this.subscription = this._movimientoService.getOneMetrica(1).subscribe(
      {
        next: (value: MetricaBalance) => {
          this.dataParaGrafico = value;
        },
        error: (err: any) => {
          //
        },
        complete: () => {
          //
        }
      }
    )
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');

    this.dataGrafico = {
      labels: ['A', 'B', 'C'],
      datasets: [
        {
          data: [300, 50, 100],
          backgroundColor: [documentStyle.getPropertyValue('--blue-500'), documentStyle.getPropertyValue('--yellow-500'), documentStyle.getPropertyValue('--green-500')],
          hoverBackgroundColor: [documentStyle.getPropertyValue('--blue-400'), documentStyle.getPropertyValue('--yellow-400'), documentStyle.getPropertyValue('--green-400')]
        }
      ]
    };


    this.optionsGrafico = {
      cutout: '70%',
      plugins: {
        legend: {
          labels: {
            color: textColor
          }
        }
      }
    };
  }
}
