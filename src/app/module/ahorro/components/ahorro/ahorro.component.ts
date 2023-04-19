import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AhorroService } from '../../../../shared/services/ahorro/ahorro.service';
import { Ahorro } from 'src/app/shared/model/activos.model';
import { ObjetivosService } from 'src/app/shared/services/objetivos/objetivos.service';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';
@Component({
  selector: 'app-ahorro',
  templateUrl: './ahorro.component.html',
  styleUrls: ['./ahorro.component.scss']
})
export class AhorroComponent implements OnInit, OnDestroy {
  data: string[] = ["asd", "das", "dsa"]
  hayAhorro: boolean = false;
  // Dialog
  visibleEnviar: boolean = false;
  visibleHacia: boolean = false;

  responsiveOptionsGrafico: any[];
  objetivos: Ahorro[]
  subscription: Subscription;

  constructor(
    private _ahorroService: AhorroService,
    private _objetivosService: ObjetivosService,
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
  ngOnInit(): void {
    this.subscription = this._ahorroService.ahorro$.subscribe(
      {
        next: (value: Ahorro[]) => {
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
    this.subscription = this._objetivosService.getHasObjetivo(1).subscribe(
      {
        next: (value: boolean) => {
          if (!this.hayAhorro) {
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
                this.router.navigate(['/dashboard/objetivo'])
              } else {
                this.router.navigate(['/dashboard/panel'])
              }
            }
            )
          }
        }
      }
    )
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
