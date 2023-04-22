import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JwtService } from 'src/app/auth/services/token.service';
import { Objetivo } from 'src/app/shared/model/objetivo.model';
import { ObjetivosService } from 'src/app/shared/services/objetivos/objetivos.service';
import { IUsuario } from '../../../../shared/model/token.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-objetivo',
  templateUrl: './crear-objetivo.component.html',
  styleUrls: ['./crear-objetivo.component.scss']
})
export class CrearObjetivoComponent implements OnInit {
  formulario: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private _tokenService: JwtService,
    private _objetivoService: ObjetivosService
    ) {
    this.formulario = this.formBuilder.group(
      {
        nombre: ['', Validators.required],
        descripcion: ['', Validators.required],
        fechaEstimada: ['', Validators.required],
        monto: ['', Validators.required],
      }
    )
  }
  ngOnInit(): void {
    //
  }
  submitObjetivo(): void {
    const idUsuario: IUsuario = this._tokenService.decodeToken();
    if (this.formulario.valid) {
      const objetivo: Objetivo = {
        id: null,
        nombre: this.formulario.value.nombre,
        descripcion: this.formulario.value.descripcion,
        fechaEstimada: this.formulario.value.fechaEstimada,
        monto: this.formulario.value.monto,
        idUsuario: idUsuario.uuid!,
      }
      this._objetivoService.postObjetivo(objetivo).subscribe(
        {
          next: (value: any) => {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Ahorro creado',
              showConfirmButton: false,
              timer: 1500
            })
          },
          error: (err: any) => {
            Swal.fire({
              position: 'center',
              icon: 'error',
              title: 'Ahorro no creado',
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
