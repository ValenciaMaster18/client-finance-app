import { Component, OnDestroy, OnInit } from '@angular/core';
import { MetricaInversion } from 'src/app/shared/model/domain/metricaInversion.model';
import { Inversiones } from 'src/app/shared/model/inversiones.model';
import { InversionService } from 'src/app/shared/services/inversiones/inversion.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { PortafolioService } from 'src/app/shared/services/portafolios/portafolio.service';
import { MetricaPortafolio } from 'src/app/shared/model/domain/metricaportafolio.model';
import { JwtService } from 'src/app/auth/services/token.service';
import { IUsuario } from 'src/app/shared/model/token.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import * as numeral from 'numeral';

@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.component.html',
  styleUrls: ['./detalles.component.scss']
})
export class DetallesComponent implements OnInit, OnDestroy {
  inversiones: MetricaInversion[] = [];
  portafolio!: MetricaPortafolio;
  subscription: Subscription;
  numeral = numeral;
  formularioLiquidar: FormGroup;
  constructor(
    private _inversionService: InversionService,
    private _portafolioService: PortafolioService,
    private _jwtService: JwtService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute
  ) {
    this.formularioLiquidar = this.formBuilder.group(
      {
        nombreInversion: ['', [Validators.required]]
      }
    )
    this.subscription = new Subscription()
  }
  ngOnInit(): void {
    this.subscription = this.activatedRoute.paramMap.subscribe(
      {
        next: (value: ParamMap) => {
          if (value.get("idPortafolio") != "") {
            const id = value.get("idPortafolio");
            this.subscription = this._inversionService.getManyMetricas(id!).subscribe({
              next: (value: MetricaInversion[]) => {
                this.inversiones = value;
              },
              error: (error) => {
              }
            });
            this.subscription = this._portafolioService.getOneMetrica(id!).subscribe({
              next: (value: MetricaPortafolio) => {
                this.portafolio = value;
              },
              error: (error) => {
              }
            });
          }
        }
      }
    )

  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
  mensaje: string = 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry';
  dataMetricaInversion: MetricaInversion[] = []
  visibilidad: boolean = false;

  showDialog(): void {
    this.visibilidad = !this.visibilidad;
  }

  liquidarInversion(): void {
    const token: IUsuario | any = this._jwtService.decodeToken();

    if (this.formularioLiquidar.valid) {
      const inversionId: MetricaInversion[] = this.inversiones.filter(element => element.nombre == this.formularioLiquidar.value.nombreInversion)
      // // Obtengo la votacion por id
      if (inversionId.length != 0) {
        this._inversionService.getOneInversiones((inversionId[0].idInversion).toString()).subscribe(
          {
            next: (value: Inversiones) => {
              this._inversionService.pathInversiones(value, token.uuid!).subscribe(
                {
                  next: (value: any) => {
                    Swal.fire({
                      position: 'center',
                      icon: 'success',
                      title: 'Inversion liquidad',
                      showConfirmButton: false,
                      timer: 1500
                    })
                    this.formularioLiquidar.reset()
                    this.visibilidad = false;
                    this.ngOnInit();
                  },
                  error: (er: any) => {
                    Swal.fire({
                      position: 'center',
                      icon: 'info',
                      title: 'Inversion no liquidad',
                      showConfirmButton: false,
                      timer: 3000
                    })
                  }
                }
              )
            },
            error: (err: any) => {
              Swal.fire({
                position: 'center',
                icon: 'info',
                title: 'Esta inversion buscada no existe',
                showConfirmButton: false,
                timer: 3000
              })
            }
          }
        )
      } else {
        Swal.fire({
          position: 'center',
          icon: 'info',
          title: 'Esta inversion buscada no existe',
          showConfirmButton: false,
          timer: 3000
        })
      }

    } else {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Formulario invalido. Todos los campos son obligatorios',
        showConfirmButton: false,
        timer: 3000
      })
    }
  }
}
