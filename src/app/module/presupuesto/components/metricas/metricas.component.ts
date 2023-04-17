import { Component } from '@angular/core';
import { PresupuestoService } from 'src/app/shared/services/presupuestos/presupuesto.service';
import { MetricaPresupuesto } from '../../../../shared/model/domain/metricapresupuesto.model';

@Component({
  selector: 'app-metricas',
  templateUrl: './metricas.component.html',
  styleUrls: ['./metricas.component.scss']
})
export class MetricasComponent {
  data: string[] = ["asd", "das", "dsa"]
  DataGrafico!: MetricaPresupuesto;
  responsiveOptionsGrafico!: any[];
  basicDataGrafico: any;

  constructor(private _presupuestoService: PresupuestoService) {
    // Connfiguracion del slider
    this.responsiveOptionsGrafico = [
      {
        breakpoint: '1199px',
        numVisible: 1,
        numScroll: 1
      },
      {
        breakpoint: '991px',
        numVisible: 2,
        numScroll: 1
      },
      {
        breakpoint: '767px',
        numVisible: 1,
        numScroll: 1
      }
    ];
   }

  ngOnInit() {
    this.cargarGrafico()
    // this._presupuestoService.getManyMetricas().subscribe(
    //   {
    //     next: (value: MetricaPresupuesto) => {
    //       this.DataGrafico = value;
    //       this.cargarGrafico()
    //     },
    //     error: (err: any) => {
    //       //
    //     },
    //     complete: () => {
    //       //
    //     }

    //   }
    // )
  }
  cargarGrafico(): void {
    this.basicDataGrafico = {
      // this.DataGrafico.conceptos
      labels: ["Q1", "Q2", "Q3"],
      datasets: [
        {
          label: 'Movimientos por conceptos',
          // this.DataGrafico.conceptos[0]
          data: [150, 250, 400],
          backgroundColor: ['#3E98EF'],
          borderColor: ['#3E98EF'],
          borderWidth: 1
        }
      ]
    };
  }
}
