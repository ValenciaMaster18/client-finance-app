import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PresupuestoService } from 'src/app/shared/services/presupuestos/presupuesto.service';
import { Presupuesto } from '../../../../../shared/model/presupuesto.model';

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
    if(this.formulario.valid){
      const presupuesto: Presupuesto = {
        id: 1,
        nombre: this.formulario.value.nombre,
        descripcion: this.formulario.value.descripcion,
        periodo: this.formulario.value.periodo,
        idUsuario: null
      }
      this._presupuestoService.postPresupuesto(presupuesto).subscribe()
    }else{
      
    }
  }
}
