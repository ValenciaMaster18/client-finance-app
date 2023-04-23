import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { JwtService } from 'src/app/auth/services/token.service';
import { MetricaBalance } from 'src/app/shared/model/domain/metricabalance.model';
import { IUsuario } from 'src/app/shared/model/token.model';
import { MovimientoService } from 'src/app/shared/services/movimientos/movimiento.service';
import Swal from 'sweetalert2';
import { Balance } from '../../../../../shared/model/domain/metricabalance.model';
import * as numeral from 'numeral';
import { ImporteConcepto } from 'src/app/shared/model/importconcepto.model';

@Component({
  selector: 'app-ingresos',
  templateUrl: './ingresos.component.html',
  styleUrls: ['../../../../../../assets/css/movimiento/egre-ingre.scss']
})
export class IngresosComponent implements OnInit {
  mensaje: string = 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry';
  dataParaGrafico!: MetricaBalance;
  numeral = numeral;
  dataGrafico: any;
  optionsGrafico: any;
  mostrarMetricas: boolean = false;

  monto: number = 0;
  concepto: string[] = [];
  valores: ImporteConcepto[] = [];

  // Finalizar la suscripcion
  subscription: Subscription;
  constructor(
    private _movimientoService: MovimientoService,
    private _tokenService: JwtService,
    private router: Router

  ) {
    this.subscription = new Subscription();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
  ngOnInit() {
    const token: IUsuario = this._tokenService.decodeToken()
    const promesaDos = new Promise((resolve, reject) => {
      const subscription = this._movimientoService.getHayMetricas(token.uuid!).subscribe({
        next: (value: boolean) => {
          resolve(value)
          if (!value) {
            Swal.fire({
              imageUrl: 'https://img.freepik.com/iconos-gratis/hucha_318-710502.jpg?w=2000',
              imageWidth: 220,
              imageHeight: 180,
              title: 'Oops...',
              text: "No tienes Movimientos creemos uno juntos",
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Continuar'
            }).then((result) => {
              if (result.isConfirmed) {
                this.router.navigate(['/dashboard/movimiento/metricas/crear-movimiento/ingreso'])
              } else {
                this.router.navigate(['/dashboard/panel'])
              }
            });
          } else {
            this.mostrarMetricas = true;
          }
        },
        error: (err: any) => {
          reject(err);
        },
        complete: () => {
          //
        }
      });
    });
    const promesaUno = new Promise((resolve, reject) => {
      const subscription = this._movimientoService.getOneMetrica(token.uuid!).subscribe({
        next: (value: MetricaBalance) => {
          this.dataParaGrafico = value;
          this.concepto = Object.keys(this.dataParaGrafico.detalleImporteConceptoPorTipo.ingresos);
          this.valores = Object.values(this.dataParaGrafico.detalleImporteConceptoPorTipo.ingresos);
          this.cargarGrafico()
          resolve(value)
        },
        error: (err: any) => {
          reject(err);
        },
        complete: () => {
          //
        }
      });
    });
  }

  cargarGrafico(): void {
    const valores = Object.values(this.dataParaGrafico.detalleImporteConceptoPorTipo.ingresos)
    const montos = Object.values(valores).map(element => element.monto);
    for (let index = 0; index < montos.length; index++) {
      this.monto += montos[index];
    }
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');

    this.dataGrafico = {
      labels: Object.keys(this.dataParaGrafico.detalleImporteConceptoPorTipo.ingresos),
      datasets: [
        {
          data: montos,
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
