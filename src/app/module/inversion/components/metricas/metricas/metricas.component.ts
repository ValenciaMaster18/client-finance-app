import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { JwtService } from 'src/app/auth/services/token.service';
import { UsernameService } from 'src/app/auth/services/username.service';
import { MetricaPortafolio } from 'src/app/shared/model/domain/metricaportafolio.model';
import { IUsuario } from 'src/app/shared/model/token.model';
import { ObjetivosService } from 'src/app/shared/services/objetivos/objetivos.service';
import { PortafolioService } from 'src/app/shared/services/portafolios/portafolio.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-metricas',
  templateUrl: './metricas.component.html',
  styleUrls: ['./metricas.component.scss']
})
export class MetricasComponent implements OnInit, OnDestroy {
  data: string[] = ["asd", "das", "dsa"]
  mostrarMetricas: boolean = false;
  dataCard: MetricaPortafolio[] = [];
  responsiveOptionsGrafico: any[];
  subscription: Subscription;

  constructor(
    private _portafolioService: PortafolioService,
    private _objetivosService: ObjetivosService,
    private _usernameService: UsernameService,
    private _tokenService: JwtService,
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
  ngOnInit() {
    const username = this._usernameService.getUsername();
    const token: IUsuario = this._tokenService.decodeToken();

    const hasObjetivoPromise = new Promise((resolve, reject) => {
      this.subscription = this._objetivosService.getHasObjetivo(token.uuid!).subscribe({
        next: (value: boolean) => {
          if (!value) {
            Swal.fire({
              imageUrl: 'https://img.freepik.com/iconos-gratis/hucha_318-710502.jpg?w=2000',
              imageWidth: 220,
              imageHeight: 180,
              title: 'Oops...',
              text: "No tienes objetivos creemos uno juntos",
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Continuar'
            }).then((result) => {
              if (result.isConfirmed) {
                this.router.navigate(['/dashboard/objetivo/crear-objetivo'])
              } else {
                this.router.navigate(['/dashboard/panel'])
              }
            });
            reject('No tienes objetivos');
          } else {
            this.mostrarMetricas = true;
            resolve(this.mostrarMetricas);
          }
        }
      });
    });

    const getManyMetricaPromise = new Promise((resolve, reject) => {
      this.subscription = this._portafolioService.getManyMetrica(username).subscribe({
        next: (value: MetricaPortafolio[]) => {
          this.dataCard = value;
          console.log(value);
          resolve(value);
        },
        error: (err: any) => {
          console.log("sddsdfs" + err);
          reject(err);
        }
      });
    });

    Promise.all([hasObjetivoPromise, getManyMetricaPromise])
      .then(() => {
        // Resto del código aquí
        console.log(username);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

}


