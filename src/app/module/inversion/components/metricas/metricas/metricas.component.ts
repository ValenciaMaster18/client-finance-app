import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MetricaPortafolio } from 'src/app/shared/model/domain/metricaportafolio.model';
import { ObjetivosService } from 'src/app/shared/services/objetivos/objetivos.service';
import { PortafolioService } from 'src/app/shared/services/portafolios/portafolio.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-metricas',
  templateUrl: './metricas.component.html',
  styleUrls: ['./metricas.component.scss']
})
export class MetricasComponent implements OnInit, OnDestroy{
  data: string[] = ["asd", "das", "dsa"]
  hayAhorro: boolean = false;
  dataCard: MetricaPortafolio[] = [];
  responsiveOptionsGrafico: any[];
  subscription: Subscription;

  constructor(
    private _portafolioService: PortafolioService,
    private _objetivosService: ObjetivosService,
    private router: Router
    ) {
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
    // this.subscription = this._objetivosService.getHasObjetivo(1).subscribe(
    //   {
    //     next: (value: boolean) => {
    //       if (!this.hayAhorro) {
    //         Swal.fire({
    //           imageUrl: 'https://img.freepik.com/iconos-gratis/hucha_318-710502.jpg?w=2000',
    //           imageWidth: 220,
    //           imageHeight: 180,
    //           title: 'Oops...',
    //           text: "No tienes objetivos creemos uno juntos",
    //           showCancelButton: true,
    //           confirmButtonColor: '#3085d6',
    //           cancelButtonColor: '#d33',
    //           confirmButtonText: 'Continuar'
    //         }).then((result) => {
    //           if (result.isConfirmed) {
    //             this.router.navigate(['/dashboard/objetivo/crear-objetivo'])
    //           } else {
    //             this.router.navigate(['/dashboard/panel'])
    //           }
    //         }
    //         )
    //       }
    //     }
    //   }
    // )
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
}
