import { Component, OnInit } from '@angular/core';
import { MetricaPresupuesto } from 'src/app/shared/model/domain/metricapresupuesto.model';
import { Movimiento } from 'src/app/shared/model/movimiento.model';
import { MovimientoService } from 'src/app/shared/services/movimientos/movimiento.service';
import { PresupuestoService } from 'src/app/shared/services/presupuestos/presupuesto.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ngxCsv } from 'ngx-csv/ngx-csv';
import * as numeral from 'numeral';
@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.component.html',
  styleUrls: ['./detalles.component.scss']
})
export class DetallesComponent implements OnInit {
  idPresupuesto: string | null | number = '';
  jsonCsv: any[] = [];
  numeral = numeral;
  dataMetricaPresupuesto!: MetricaPresupuesto;
  dataMovimientoTable!: Movimiento[];
  mensaje: string = 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry';
  dataMovimiento!: any[]

  constructor(
    private _presupuestoService: PresupuestoService,
    private _movimientoService: MovimientoService,
    private activatedRoute: ActivatedRoute
  ) { }

  async ngOnInit() {
    try {
      const idPresupuesto = await new Promise<string>((resolve, reject) => {
        this.activatedRoute.paramMap.subscribe(
          {
            next: (value: ParamMap) => {
              this.idPresupuesto = value.get("idPresupuesto")!
              resolve(value.get("idPresupuesto")!)
            },
            error: (err: any) => {
              reject(err)
            },
            complete: () => {
              //
            }
          }
        )
      }).then((value: string) => {
        this._presupuestoService.getOneMetricas(value!).subscribe(
          {
            next: (value: MetricaPresupuesto) => {
              console.log(value)
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
        this._movimientoService.getPresupuesto(0, 9, value!).subscribe(
          {
            next: (value: any) => {
              this.dataMovimientoTable = value.content
            },
            error: (err: any) => {
              console.log(err)
            },
            complete: () => {

            }
          }
        )
      })
    } catch (error) {
      // manejar el error aquí
    }
  }
  exportCsv(): void{
    this.dataMovimientoTable.forEach((data) => {
      this.jsonCsv.push(
        {
          concepto: data.concepto,
          import: data.importe,
          tipo: data.tipo
        }
      )
    })
    let opciones = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalseparator: '.',
      showLabels: false,
      showTitle: false,
      title: 'Presupuesto',
      useBom: false,
      noDownload: false,
      headers: [
        "CONCEPTO",
        "IMPORTE",
        "TIPO",
      ]
    };
    new ngxCsv(this.jsonCsv, "Presupuesto", opciones)
    this.jsonCsv.splice(0, this.jsonCsv.length)
  }
}
