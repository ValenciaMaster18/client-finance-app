import { Component, OnDestroy, OnInit } from '@angular/core';
import { Objetivo } from 'src/app/shared/model/objetivo.model';
import { Subscription } from 'rxjs';
import { ObjetivosService } from 'src/app/shared/services/objetivos/objetivos.service';
import * as numeral from 'numeral';
@Component({
  selector: 'app-objetivo',
  templateUrl: './objetivo.component.html',
  styleUrls: ['./objetivo.component.scss']
})
export class ObjetivoComponent implements OnInit, OnDestroy{
  numeral = numeral;
  responsiveOptionsGrafico: any[];
  objetivos: Objetivo[]
  subscription: Subscription;

  constructor(private _objetivosService: ObjetivosService) {
    this.objetivos = []
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
    this.subscription = this._objetivosService.objetivoSubject$.subscribe(
      {
        next: (value: any) => {
          this.objetivos = value;
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
