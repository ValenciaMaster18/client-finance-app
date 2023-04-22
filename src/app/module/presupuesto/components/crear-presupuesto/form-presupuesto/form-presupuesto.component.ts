import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PresupuestoService } from 'src/app/shared/services/presupuestos/presupuesto.service';
import { Presupuesto } from '../../../../../shared/model/presupuesto.model';
import { JwtService } from 'src/app/auth/services/token.service';
import { IUsuario } from 'src/app/shared/model/token.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-presupuesto',
  templateUrl: './form-presupuesto.component.html',
  styleUrls: ['./form-presupuesto.component.scss']
})
export class FormPresupuestoComponent {
  formulario: FormGroup;
  periodo: string[] = [
    "DIARIO",
    "SEMANAL",
    "MENSUAL",
    "SEMESTRAL",
    "ANUAL",
    "OTRO",
    "NA"
  ];
  constructor(
    private _presupuestoService: PresupuestoService,
    private _tokenService: JwtService,
    private formBuilder: FormBuilder
  ) {
    this.formulario = this.formBuilder.group(
      {
        nombre: ['', Validators.required],
        descripcion: ['', Validators.required],
        periodo: ['', Validators.required]
      }
    )
  }
  submit(): void {
    const token: IUsuario = this._tokenService.decodeToken()
    if(this.formulario.valid){
      const presupuesto: Presupuesto = {
        id: null,
        nombre: this.formulario.value.nombre,
        descripcion: this.formulario.value.descripcion,
        periodo: this.formulario.value.periodo,
        idUsuario: token.uuid!
      }

      this._presupuestoService.postPresupuesto(presupuesto).subscribe(
        {
          next: (value: any) => {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Presupuesto creado',
              showConfirmButton: false,
              timer: 1500
            })
            this.formulario.reset()
          },
          error: (err: any) => {
            Swal.fire({
              position: 'center',
              icon: 'error',
              title: 'Presupuesto no creado',
              showConfirmButton: false,
              timer: 3000
            })
          }
        }
      )
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
}
