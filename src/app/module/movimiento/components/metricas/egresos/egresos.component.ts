import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { JwtService } from 'src/app/auth/services/token.service';
import { MetricaBalance } from 'src/app/shared/model/domain/metricabalance.model';
import { ImporteConcepto } from 'src/app/shared/model/importconcepto.model';
import { IUsuario } from 'src/app/shared/model/token.model';
import { MovimientoService } from 'src/app/shared/services/movimientos/movimiento.service';

@Component({
  selector: 'app-egresos',
  templateUrl: './egresos.component.html',
  styleUrls: ['../../../../../../assets/css/movimiento/egre-ingre.scss']
})
export class EgresosComponent implements OnInit {
  mensaje: string = 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry';
  dataParaGrafico!: MetricaBalance;
  dataGrafico: any;
  optionsGrafico: any;

  concepto: string[] = [];
  valores: ImporteConcepto[] = [];

  // Finalizar la suscripcion
  subscription: Subscription;
  constructor(
    private _movimientoService: MovimientoService,
    private _tokenService: JwtService
  ) {
    this.subscription = new Subscription();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
  ngOnInit() {
    const token: IUsuario = this._tokenService.decodeToken()
    this.subscription = this._movimientoService.getOneMetrica(token.uuid!).subscribe(
      {
        next: (value: MetricaBalance) => {
          this.dataParaGrafico = value;
          this.concepto = Object.keys(this.dataParaGrafico.detalleImporteConceptoPorTipo.egresos);
          this.valores = (Object.values(this.dataParaGrafico.detalleImporteConceptoPorTipo.egresos));
          this.cargarGrafico()
        },
        error: (err: any) => {
          //
        },
        complete: () => {
          //
        }
      }
    )

  }
  cargarGrafico(): void {
    const valores = Object.values(this.dataParaGrafico.detalleImporteConceptoPorTipo.egresos)
    const montos = Object.values(valores).map(element => element.monto);

    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');

    this.dataGrafico = {
      labels: [Object.keys(this.dataParaGrafico.detalleImporteConceptoPorTipo.egresos)],
      datasets: [
        {
          data: [montos],
          backgroundColor: [documentStyle.getPropertyValue('--blue-500'), documentStyle.getPropertyValue('--yellow-500'), documentStyle.getPropertyValue('--green-500')],
          hoverBackgroundColor: [documentStyle.getPropertyValue('--blue-400'), documentStyle.getPropertyValue('--yellow-400'), documentStyle.getPropertyValue('--green-400')]
        }
      ]
    };

    this.optionsGrafico = {
      cutout: '70%',
      plugins: {
        legend: {
          display: false,
          labels: {
            color: textColor
          }
        }
      }
    };
  }
}
