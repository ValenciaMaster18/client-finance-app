import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MovimientoService } from 'src/app/shared/services/movimientos/movimiento.service';

@Component({
  selector: 'app-crear-movimiento',
  templateUrl: './crear-movimiento.component.html',
  styleUrls: ['./crear-movimiento.component.scss']
})
export class CrearMovimientoComponent {

  formulario!: FormGroup;

  constructor(
    private _movimientoService: MovimientoService,
    private formBuilder: FormBuilder
  ) {
    this.formulario = formBuilder.group(
      {
        importe: ['', [Validators.required]],
        tipo: ['', [Validators.required]],
        contabilizable: ['', [Validators.required]],
        concepto: ['', [Validators.required]],
        logoConcepto: ['', [Validators.required]]
      }
    )
   }


  onSubmit(): void {

  }
}
