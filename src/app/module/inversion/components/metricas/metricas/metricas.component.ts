import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MetricaPortafolio } from 'src/app/shared/model/domain/metricaportafolio.model';
import { PortafolioService } from 'src/app/shared/services/portafolios/portafolio.service';

@Component({
  selector: 'app-metricas',
  templateUrl: './metricas.component.html',
  styleUrls: ['./metricas.component.scss']
})
export class MetricasComponent implements OnInit, OnDestroy{
  data: string[] = ["asd", "das", "dsa"]
  dataCard: MetricaPortafolio[] = [];
  responsiveOptionsGrafico: any[];
  subscription: Subscription;

  constructor(private _portafolioService: PortafolioService) {
    this.subscription = new Subscription()
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
  ngOnInit(): void {
    this.subscription = this._portafolioService.getManyMetrica().subscribe(
      {
        next: (value: MetricaPortafolio[]) => {
          this.dataCard = value;
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
  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
}
