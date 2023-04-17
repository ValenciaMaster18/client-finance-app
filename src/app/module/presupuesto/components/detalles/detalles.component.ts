import { Component, OnInit } from '@angular/core';
import { MetricaPresupuesto } from 'src/app/shared/model/domain/metricapresupuesto.model';
import { Movimiento } from 'src/app/shared/model/movimiento.model';
import { MovimientoService } from 'src/app/shared/services/movimientos/movimiento.service';
import { PresupuestoService } from 'src/app/shared/services/presupuestos/presupuesto.service';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.component.html',
  styleUrls: ['./detalles.component.scss']
})
export class DetallesComponent implements OnInit {
  dataMetricaPresupuesto!: MetricaPresupuesto;
  dataMovimientoTable!: Movimiento[];
  mensaje: string = 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry';
  dataMovimiento!: any[]
  basicData: any;
  basicOptions: any;

  constructor(
    private _presupuestoService: PresupuestoService,
    private _movimientoService: MovimientoService,
    private activatedRoute: ActivatedRoute
  ) { }

  async ngOnInit() {
    this.cargarGrafico()
    this._presupuestoService.getOneMetricas(1).subscribe(
      {
        next: (value: MetricaPresupuesto) => {
          this.dataMetricaPresupuesto = value
        },
        error: (err: any) => {
          //
        },
        complete: () => {
          //
        }
      }
    )
    try {
      const idPresupuesto = await new Promise<number>((resolve, reject) => {
        this.activatedRoute.paramMap.subscribe(
          {
            next: (value: ParamMap) => {
              resolve(Number(value.get("idPresupuesto")))
            },
            error: (err: any) => {
              reject(err)
            },
            complete: () => {
              //
            }
          }
        )
      })
      this._movimientoService.getPresupuesto(0, 9, idPresupuesto).subscribe(
        {
          next: (value: Movimiento[]) => {
            this.dataMovimientoTable = value
          },
          error: (err: any) => {

          },
          complete: () => {

          }
        }
      )
    } catch (error) {
      // manejar el error aquí
    }
  }

  cargarGrafico(): void {
    this.basicData = {
      labels: ['Q1', 'Q2', 'Q3', 'Q4'],
      datasets: [
        {
          label: 'Sales',
          data: [540, 325, 702, 620],
          backgroundColor: ['rgba(255, 159, 64, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(153, 102, 255, 0.2)'],
          borderColor: ['rgb(255, 159, 64)', 'rgb(75, 192, 192)', 'rgb(54, 162, 235)', 'rgb(153, 102, 255)'],
          borderWidth: 1
        }
      ]
    };
  }
}
