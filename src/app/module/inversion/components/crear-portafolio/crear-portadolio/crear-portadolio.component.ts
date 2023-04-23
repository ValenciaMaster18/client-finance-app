import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Objetivo } from '../../../../../shared/model/objetivo.model';
import { Subscription } from 'rxjs';
import { ObjetivosService } from 'src/app/shared/services/objetivos/objetivos.service';
import { JwtService } from 'src/app/auth/services/token.service';
import { IUsuario } from 'src/app/shared/model/token.model';
import { Portafolio } from 'src/app/shared/model/portafolio.model';
import { PortafolioService } from 'src/app/shared/services/portafolios/portafolio.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-portadolio',
  templateUrl: './crear-portadolio.component.html',
  styleUrls: ['./crear-portadolio.component.scss']
})
export class CrearPortadolioComponent implements OnInit, OnDestroy {
  formulario: FormGroup;
  objetivo: Objetivo[];
  subscription: Subscription;
  constructor(
    private _objetivosService: ObjetivosService,
    private _tokenService: JwtService,
    private _portafolioService: PortafolioService,
    private formBuilder: FormBuilder
  ) {
    this.objetivo = [];
    this.subscription = new Subscription();
    this.formulario = this.formBuilder.group(
      {
        nombre: ['', [Validators.required]],
        descripcion: ['', [Validators.required]],
        nombreObjetivo: ['', [Validators.required]]
      }
    )
  }
  ngOnInit(): void {
    const token: IUsuario = this._tokenService.decodeToken();
    this.subscription = this._objetivosService.getAllObjetivo(token.uuid!).subscribe(
      {
        next: (value: Objetivo[]) => {
          this.objetivo = value;
        }
      }
    )
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  enviarObjetivo(): void {
    const token: IUsuario = this._tokenService.decodeToken();
    const idObjetivo = this.objetivo.filter(element => element.nombre == this.formulario.value.nombreObjetivo)
    if (this.formulario.valid) {
      const portafolio: Portafolio = {
        id: null,
        nombre: this.formulario.value.nombre,
        descripcion: this.formulario.value.descripcion,
        idUsuario: token.uuid!,
        idObjetivo: idObjetivo[0].id
      }
      this._portafolioService.postPortafolio(portafolio).subscribe(
        {
          next: (value: any) => {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Portafolio creado',
              showConfirmButton: false,
              timer: 1500
            })
            this.formulario.reset()
          },
          error: (err: any) => {
            Swal.fire({
              position: 'center',
              icon: 'error',
              title: 'Portafolio no creado',
              showConfirmButton: false,
              timer: 3000
            })
          }
        }
      )
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
