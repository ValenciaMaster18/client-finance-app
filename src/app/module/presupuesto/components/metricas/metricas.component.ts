import { Component } from '@angular/core';
import { PresupuestoService } from 'src/app/shared/services/presupuestos/presupuesto.service';
import { MetricaPresupuesto } from '../../../../shared/model/domain/metricapresupuesto.model';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { ObjetivosService } from 'src/app/shared/services/objetivos/objetivos.service';
import Swal from 'sweetalert2';
import * as numeral from 'numeral';
import { IUsuario } from 'src/app/shared/model/token.model';
import { UsernameService } from 'src/app/auth/services/username.service';
import { JwtService } from 'src/app/auth/services/token.service';

@Component({
  selector: 'app-metricas',
  templateUrl: './metricas.component.html',
  styleUrls: ['./metricas.component.scss']
})
export class MetricasComponent {
  numeral = numeral;
  mensaje: string = 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry';
  DataGrafico!: MetricaPresupuesto[];
  mostrarMetricas: boolean = false;
  responsiveOptionsGrafico!: any[];
  subscription: Subscription;

  constructor(
    private _presupuestoService: PresupuestoService,
    private _objetivosService: ObjetivosService,
    private _usernameService: UsernameService,
    private _tokenService: JwtService,
    private router: Router
  ) {
    this.subscription = new Subscription()
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
    const username = this._usernameService.getUsername();
    const token: IUsuario = this._tokenService.decodeToken()
    this.subscription = this._objetivosService.getHasObjetivo(token.uuid!).subscribe(
      {
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
            }
            )
          } else {
            this.mostrarMetricas = true;
            this._presupuestoService.getManyMetricas(username).subscribe(
              {
                next: (value: any) => {
                  this.DataGrafico = value;
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
        }
      }
    )
  }
}
