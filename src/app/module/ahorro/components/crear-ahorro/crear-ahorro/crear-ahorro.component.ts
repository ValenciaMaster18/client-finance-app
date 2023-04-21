import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AhorroService } from 'src/app/shared/services/ahorro/ahorro.service';
import { Ahorro } from '../../../../../shared/model/ahorro.model';

@Component({
  selector: 'app-crear-ahorro',
  templateUrl: './crear-ahorro.component.html',
  styleUrls: ['./crear-ahorro.component.scss']
})
export class CrearAhorroComponent {
  idObjetivo: string[] = ["Objetivo 1", "Objetivo 2", "Objetivo 3"]
  tipoAhorro: string[] = ["CORTO_PLAZO", "MEDIANO_PLAZO", "LARGO_PLAZO"]
  tipoImport: string[] = ["PORCENTAJE", "EFECTIVO"]
  formulario: FormGroup;
  formularioCondicion: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
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
        nombre: ['', Validators.required],
        nombreObjetivo: ['', Validators.required],
        descripcion: ['', Validators.required],
        tipo: ['', Validators.required],
        importe: ['', Validators.required],
        automatico: ['', Validators.required],
      }
    )
  }
  submitAhorro(): void{
    if(this.formulario.valid){
      const ahorro: Ahorro = {
        id: null,
        nombre: this.formulario.value.nombre,
        descripcion: this.formulario.value.descripcion,
        tipo: this.formulario.value.tipo,
        importe: this.formulario.value.importe,
        automatico: this.formulario.value.automatico,
        idObjetivo: 1,
        idUsuario: 1
      }

      this._ahorroService.postAhorro(ahorro).subscribe()
    }
  }
}
