import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { JwtService } from 'src/app/auth/services/token.service';
import { UsernameService } from 'src/app/auth/services/username.service';
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
export class AhorrosComponent  implements OnInit, OnDestroy {
  data: string[] = ["asd", "das", "dsa"]
  mostrarMetricas: boolean = false;
  // Dialog
  visibleEnviar: boolean = false;
  visibleHacia: boolean = false;

  responsiveOptionsGrafico: any[];
  objetivos: Ahorro[]
  subscription: Subscription;

  constructor(
    private _ahorroService: AhorroService,
    private _objetivosService: ObjetivosService,
    private _usernameService: UsernameService,
    private _tokenService: JwtService,
    private router: Router
  ) {
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
  async ngOnInit() {
    const username = this._usernameService.getUsername();
    const token: IUsuario = this._tokenService.decodeToken()

    const promesaSiHayObjetivo = await new Promise<boolean>((resolve, reject) => {
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
            }
          }
        }
      )
    })
    const promesaObtnerAhorros = await new Promise<any>((resolve, reject) => {
      this.subscription = this._ahorroService.ahorro$.subscribe(
        {
          next: (value: any) => {
            this.objetivos = value;
            resolve(value)
          },
          error: (err: any) => {
            reject(err)
          },
          complete: () => {
            //
          }
        }
      )
    })

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
  showDialogVisibleEnviar() {
    this.visibleEnviar = !this.visibleEnviar;
  }
  showDialogVisibleHacia() {
    this.visibleHacia = !this.visibleHacia;
  }
}
