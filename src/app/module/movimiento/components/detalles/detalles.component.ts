import { Component, OnDestroy, OnInit } from '@angular/core';
import { ngxCsv } from 'ngx-csv';
import { Subscription } from 'rxjs';
import { Movimiento } from 'src/app/shared/model/movimiento.model';
import { MovimientoService } from 'src/app/shared/services/movimientos/movimiento.service';

@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.component.html',
  styleUrls: ['./detalles.component.scss']
})
export class DetallesComponent implements OnInit, OnDestroy {
  dataGrafico: any;
  dataMovimiento: Movimiento[];
  optionsGrafico: any;

  jsonCsv: any[] = [];
  // Finalizar la suscripcion
  subscription: Subscription;

  constructor(
    private _movimientoService: MovimientoService
  ){
    this.dataMovimiento = [];
    this.subscription = new Subscription();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
  ngOnInit(): void{
    this.subscription = this._movimientoService.movimiento$.subscribe(
      {
        next: (value: Movimiento[]) => {
          this.dataMovimiento = value;
          console.log(value)
        },
        error: (err: any) => {

        },
        complete: () => {

        }
      }
    )
  //   const documentStyle = getComputedStyle(document.documentElement);
  //   const textColor = documentStyle.getPropertyValue('--text-color');

  //   this.dataGrafico = {
  //     labels: ['A', 'B', 'C'],
  //     datasets: [
  //       {
  //         data: [300, 50, 100],
  //         backgroundColor: [documentStyle.getPropertyValue('--blue-500'), documentStyle.getPropertyValue('--yellow-500'), documentStyle.getPropertyValue('--green-500')],
  //         hoverBackgroundColor: [documentStyle.getPropertyValue('--blue-400'), documentStyle.getPropertyValue('--yellow-400'), documentStyle.getPropertyValue('--green-400')]
  //       }
  //     ]
  //   };


  //   this.optionsGrafico = {
  //     cutout: '70%',
  //     plugins: {
  //       legend: {
  //         labels: {
  //           color: textColor
  //         }
  //       }
  //     }
  //   };
  }
  exportCsv(): void{
    this.dataMovimiento.forEach((data) => {
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
    new ngxCsv(this.jsonCsv, "Movimiento", opciones)
    this.jsonCsv.splice(0, this.jsonCsv.length)
  }
}
