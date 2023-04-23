import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { JwtService } from 'src/app/auth/services/token.service';
import { Ahorro } from 'src/app/shared/model/ahorro.model';
import { MetricaAhorros } from 'src/app/shared/model/domain/metricaahorro.model';
import { IUsuario } from 'src/app/shared/model/token.model';
import { AhorroService } from 'src/app/shared/services/ahorro/ahorro.service';
import { BalanceService } from 'src/app/shared/services/balance/balance.service';
import { ObjetivosService } from 'src/app/shared/services/objetivos/objetivos.service';
import Swal from 'sweetalert2';
import * as numeral from 'numeral';
@Component({
  selector: 'app-ahorro',
  templateUrl: './ahorro.component.html',
  styleUrls: ['./ahorro.component.scss']
})
export class AhorrosComponent implements OnInit, OnDestroy {
  HayObjetivos: boolean = false;
  numeral = numeral;
  mensaje: string = 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry';
  // Dialog
  visibleEnviar: boolean = false;
  visibleHacia: boolean = false;
  // Transferencia
  ahorroHaciaDisponible!: Ahorro;
  ahorroDesdeDisponible!: Ahorro;
  formularioTransferenciaHaciaDisponible!: FormGroup;
  formularioTransferenciaDesdeDisponible!: FormGroup;

  responsiveOptionsGrafico: any[];
  ahorro: Ahorro[];
  subscription: Subscription;

  constructor(
    private _ahorroService: AhorroService,
    private _objetivosService: ObjetivosService,
    private _balanceServices: BalanceService,

    private _tokenService: JwtService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.ahorro = []
    this.subscription = new Subscription()
    this.formularioTransferenciaDesdeDisponible = this.formBuilder.group(
      {
        importeToTransfer: ['', [Validators.required]]
      }
    )
    this.formularioTransferenciaHaciaDisponible = this.formBuilder.group(
      {
        importeToTransfer: ['', [Validators.required]]
      }
    )
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
            this.HayObjetivos = true;
            this._ahorroService.getManyMetricas(token.uuid!).subscribe(
              {
                next: (value: MetricaAhorros) => {
                  if (value.mostraMetricas) {
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
                },
                error: (err: any) => {
                  console.log(err)
                }
              }
            )

          }
        }
      }
    )
    // this._ahorroService.getCanShowMetricas(token.uuid!).subscribe(
    //   {
    //     next: (value: boolean) => {
    //       alert(value)
    //     },
    //     error: (err: any) => {
    //       alert(err)
    //     }
    //   }
    // )

  }

  ngOnDestroy(): void {
    // Cancela la suscripción al observable cuando se destruye el componente
    this.subscription.unsubscribe()
  }
  showDialogVisibleEnviar(ahorro?: Ahorro) {
    this.ahorroDesdeDisponible = ahorro!;

    // Muestra o esconde un diálogo para enviar dinero
    this.visibleEnviar = !this.visibleEnviar;
  }
  showDialogVisibleHacia(ahorro?: Ahorro) {
    this.ahorroHaciaDisponible = ahorro!;
    // Muestra o esconde un diálogo para recibir dinero
    this.visibleHacia = !this.visibleHacia;
  }
  EnviarTransferenciaDesdeDisponible(): void {
    const token: IUsuario = this._tokenService.decodeToken()

    this._balanceServices.getBalance(token.uuid!).subscribe(
      {
        next: (value: number) => {
          if (this.formularioTransferenciaDesdeDisponible.valid && this.formularioTransferenciaDesdeDisponible.value.importeToTransfer <= value) {
            this._ahorroService.putTranferenciaDesdeDisponibleAhorro(
              this.ahorroDesdeDisponible,
              this.formularioTransferenciaDesdeDisponible.value.importeToTransfer
            ).subscribe(
              {
                next: (value: any) => {
                  Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Tranferencia enviada',
                    showConfirmButton: false,
                    timer: 1500
                  })
                  this.formularioTransferenciaDesdeDisponible.reset()
                },
                error: (err: any) => {
                  Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'Tranferencia Cancelada',
                    showConfirmButton: false,
                    timer: 1500
                  })
                }
              }

            )
          } else {
            Swal.fire({
              position: 'center',
              icon: 'info',
              title: 'Saldo insuficiente',
              showConfirmButton: false,
              timer: 1500
            })
          }
        },
        error: (err: any) => {
          console.log(err)
        }
      }
    )
  }
  EnviarTransferenciaHaciaDisponible(): void {
    if (this.formularioTransferenciaHaciaDisponible.valid) {
      this._ahorroService.putTranferenciaHaciaDisponibleAhorro(
        this.ahorroHaciaDisponible,
        this.formularioTransferenciaHaciaDisponible.value.importeToTransfer
      ).subscribe(
        {
          next: (value: any) => {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Tranferencia enviada',
              showConfirmButton: false,
              timer: 1500
            })
            this.formularioTransferenciaHaciaDisponible.reset()
          },
          error: (err: any) => {
            Swal.fire({
              position: 'center',
              icon: 'error',
              title: 'Tranferencia Cancelada',
              showConfirmButton: false,
              timer: 1500
            })
          }
        }

      )
    }
  }
}
