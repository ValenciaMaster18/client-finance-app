import { Component, OnDestroy, OnInit } from '@angular/core';
import { Objetivo } from 'src/app/shared/model/objetivo.model';
import { Subscription } from 'rxjs';
import { ObjetivosService } from 'src/app/shared/services/objetivos/objetivos.service';
import * as numeral from 'numeral';
import { JwtService } from 'src/app/auth/services/token.service';
import { IUsuario } from 'src/app/shared/model/token.model';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-objetivo',
  templateUrl: './objetivo.component.html',
  styleUrls: ['./objetivo.component.scss']
})
export class ObjetivoComponent implements OnInit, OnDestroy{
  numeral = numeral;
  mensaje: string = 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry';
  responsiveOptionsGrafico: any[];
  objetivos: Objetivo[]
  subscription: Subscription;

  constructor(
    private _jwtService: JwtService,
    private _objetivosService: ObjetivosService
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

  eliminarObjetivo(idObjetivo: string): void {
    const token: IUsuario | any = this._jwtService.decodeToken();
    this._objetivosService.deleteOnjetivo(token.uuid!, idObjetivo).subscribe(
      {
        next: () => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Objetivo eliminado',
            showConfirmButton: false,
            timer: 1500
          })
        },
        error: () => {
          Swal.fire({
            position: 'center',
            icon: 'info',
            title: 'No se puede eliminar objetivo',
            showConfirmButton: false,
            timer: 3000
          })
        }
      }
    )
  }
}
