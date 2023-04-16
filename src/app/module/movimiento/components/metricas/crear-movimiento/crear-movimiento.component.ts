import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Categoria, JsonConcepto } from 'src/app/shared/model/jsonconcepto.model';
import { MovimientoService } from 'src/app/shared/services/movimientos/movimiento.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Movimiento } from 'src/app/shared/model/movimiento.model';

@Component({
  selector: 'app-crear-movimiento',
  templateUrl: './crear-movimiento.component.html',
  styleUrls: ['./crear-movimiento.component.scss']
})
export class CrearMovimientoComponent implements OnInit {
  tipo: string | null = '';
  selectedIngreso!: Categoria;
  aplicaDescuentoEspecifico: boolean = false;
  idCuentaAhorroEspecifica: number | null = null;
  mostarCuentasAhorro: boolean = false;
  dataJsonConcepto: JsonConcepto[] = [];
  formulario!: FormGroup;

  constructor(
    private _movimientoService: MovimientoService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute
  ) {
    this._movimientoService.getConceptoLogo().subscribe(
      {
        next: (value: JsonConcepto[]) => {
          this.dataJsonConcepto = value;
          this.activatedRoute.paramMap.subscribe(
            {
              next: (value: ParamMap) => {
                this.tipo = value.get("tipo");
                console.log(this.tipo)
              }
            }
          )
        },
        error: (err: any) => {
          //
        },
        complete: () => {
          //
        }
      }
    )
    this.formulario = this.formBuilder.group(
      {
        importe: ['', [Validators.required]]
      }
    )
  }
  ngOnInit(): void {
    const x: string[] = []
    if (x.length <= 1 && this.tipo == "ingreso") {
      this.aplicaDescuentoEspecifico = false;
      this.idCuentaAhorroEspecifica = null;
    } else {
      this.mostarCuentasAhorro = true;
      this.aplicaDescuentoEspecifico = true;
    }
  }
  selectIngreso(ingreso: any): void {
    this.selectedIngreso = ingreso;
    // deselecciona todos los objetos ingreso
    if (this.tipo == "ingreso") {
      console.log(this.dataJsonConcepto[0].ingreso.forEach((value: Categoria) => value.selected = false));
      // selecciona el objeto ingreso actual
      ingreso.selected = true;
    } else {
      console.log(this.dataJsonConcepto[0].egreso.forEach((value: Categoria) => value.selected = false));
      // selecciona el objeto ingreso actual
      ingreso.selected = true;
    }
  }
  onSubmit(): void {
    if (this.formulario.valid) {
      const movimiento: Movimiento = {
        id: null,
        importe: this.formulario.value.importe,
        tipo: this.tipo,
        concepto: this.selectedIngreso.concepto,
        idUsuario: null,
        idPresupuesto: null,
        contabilizable: true,
        logoConcepto: String(this.selectedIngreso.id)
      }
      // Cambiar el id por el del formulario
      if (this.aplicaDescuentoEspecifico){
        this.idCuentaAhorroEspecifica = 1;
      }
      this._movimientoService.postMovimiento2(movimiento, this.aplicaDescuentoEspecifico, this.idCuentaAhorroEspecifica)
        .subscribe()
    } else {
      //
    }
  }
}
