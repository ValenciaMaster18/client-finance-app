import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AhorroService } from 'src/app/shared/services/ahorro/ahorro.service';
import { Ahorro } from '../../../../../shared/model/ahorro.model';
import { ObjetivosService } from 'src/app/shared/services/objetivos/objetivos.service';
import { JwtService } from 'src/app/auth/services/token.service';
import { IUsuario } from 'src/app/shared/model/token.model';
import { Objetivo } from 'src/app/shared/model/objetivo.model';
import { Condicion } from '../../../../../shared/model/condicion.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-ahorro',
  templateUrl: './crear-ahorro.component.html',
  styleUrls: ['./crear-ahorro.component.scss']
})
export class CrearAhorroComponent implements OnInit {
  objetivo: Objetivo[] = [];
  condicion!: Condicion;
  habilitarCondicion: boolean = false;
  tipoAhorro: string[] = ["CORTO_PLAZO", "MEDIANO_PLAZO", "LARGO_PLAZO"]
  tipoImport: string[] = ["PORCENTAJE", "EFECTIVO"]
  expresion: string[] = ["DESCONTAR_MAYOR_IGUAL_A", "DESCONTAR_MAYOR_A", "DESCONTAR_IGUAL_A", "DESCONTAR_MENOR_IGUAL_A", "DESCONTAR_MENOR_A", "DESCONTAR;"]

  formulario: FormGroup;
  formularioCondicion: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private _objetivosService: ObjetivosService,
    private _tokenService: JwtService,
    private _ahorroService: AhorroService
  ) {
    this.formularioCondicion = this.formBuilder.group(
      {
        expresion: ['', [Validators.required]],
        importe: ['', [Validators.required]],
        tipoImporte: ['', [Validators.required]]
      }
    )
    this.formulario = this.formBuilder.group(
      {
        nombreObjetivo: ['', Validators.required],
        nombre: ['', Validators.required],
        descripcion: ['', Validators.required],
        tipo: ['', Validators.required],
        importe: ['', Validators.required]
      }
    )
  }
  ngOnInit(): void {
    const token: IUsuario = this._tokenService.decodeToken();
    this._objetivosService.getAllObjetivo(token.uuid!).subscribe(
      {
        next: (value: Objetivo[]) => {
          this.objetivo = value;
        }
      }
    )
  }
  submitAhorro(): void {
    const token: IUsuario = this._tokenService.decodeToken();
    const idObjetivo = this.objetivo.filter(element => element.nombre == this.formulario.value.nombreObjetivo)
    if (this.formulario.valid) {
      if (this.condicion) {
        const ahorro: Ahorro = {
          id: null,
          nombre: this.formulario.value.nombre,
          descripcion: this.formulario.value.descripcion,
          tipo: this.formulario.value.tipo,
          importe: this.formulario.value.importe,
          automatico: false,
          idObjetivo: idObjetivo[0].id,
          idUsuario: token.uuid!,
          condicion: this.condicion
        }
        this._ahorroService.postAhorro(ahorro).subscribe(
          {
            next: () => {
              Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Ahorro creado',
                showConfirmButton: false,
                timer: 1500
              })
              this.formulario.reset()
              this.formularioCondicion.reset()
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
        const ahorro: Ahorro = {
          id: null,
          nombre: this.formulario.value.nombre,
          descripcion: this.formulario.value.descripcion,
          tipo: this.formulario.value.tipo,
          importe: this.formulario.value.importe,
          automatico: false,
          idObjetivo: idObjetivo[0].id,
          idUsuario: token.uuid!
        }
        this._ahorroService.postAhorro(ahorro).subscribe(
          {
            next: () => {
              Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Ahorro creado',
                showConfirmButton: false,
                timer: 1500
              })
              this.formulario.reset()
              this.formularioCondicion.reset()
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
      }
    }else{
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Formulario invalido. Todos los campos son obligatorios',
        showConfirmButton: false,
        timer: 3000
      })
    }
  }

  abrirFormCondicion(): void {
    this.habilitarCondicion = !this.habilitarCondicion;
  }

  cargarCondicion(): void {
    if (this.formularioCondicion.valid) {
      const condicion: Condicion = {
        id: null,
        expresion: this.formularioCondicion.value.expresion,
        importe: this.formularioCondicion.value.importe,
        tipoImporte: this.formularioCondicion.value.tipoImporte,
        enabled: false
      }
      this.habilitarCondicion = false;
      this.condicion = condicion;
    }
  }
}
