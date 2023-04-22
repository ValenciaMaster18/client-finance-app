import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { JwtService } from 'src/app/auth/services/token.service';
import { Ahorro } from 'src/app/shared/model/ahorro.model';
import { IUsuario } from 'src/app/shared/model/token.model';
import { AhorroService } from 'src/app/shared/services/ahorro/ahorro.service';
import { ObjetivosService } from 'src/app/shared/services/objetivos/objetivos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ahorro',
  templateUrl: './ahorro.component.html',
  styleUrls: ['./ahorro.component.scss']
})
export class AhorrosComponent implements OnInit, OnDestroy {
  mostrarMetricas: boolean = false;
  // Dialog
  visibleEnviar: boolean = false;
  visibleHacia: boolean = false;
  responsiveOptionsGrafico: any[];
  ahorro: Ahorro[];
  subscription: Subscription;

  constructor(
    private _ahorroService: AhorroService,
    private _objetivosService: ObjetivosService,
    private _tokenService: JwtService,
    private router: Router
  ) {
    this.ahorro = []
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
    // Obtiene el token decodificado y verifica si el usuario tiene un objetivo
    const token: IUsuario = this._tokenService.decodeToken()
    this.subscription = this._objetivosService.getHasObjetivo(token.uuid!).subscribe(
      {
        next: (value: boolean) => {
          // Si no tiene un objetivo, muestra un mensaje de alerta y redirecciona al usuario
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
          }
          // Si tiene un objetivo, carga los ahorros
          else {
            this.mostrarMetricas = true;
            this.subscription = this._ahorroService.ahorro$.subscribe(
              {
                next: (value: any) => {
                  this.ahorro = value
                },
                error: (err: any) => {
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

  ngOnDestroy(): void {
    // Cancela la suscripción al observable cuando se destruye el componente
    this.subscription.unsubscribe()
  }
  showDialogVisibleEnviar() {
    // Muestra o esconde un diálogo para enviar dinero
    this.visibleEnviar = !this.visibleEnviar;
  }
  showDialogVisibleHacia() {
    // Muestra o esconde un diálogo para recibir dinero
    this.visibleHacia = !this.visibleHacia;
  }
}
