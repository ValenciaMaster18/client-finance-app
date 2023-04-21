import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Categoria, JsonConcepto } from 'src/app/shared/model/jsonconcepto.model';
import { MovimientoService } from 'src/app/shared/services/movimientos/movimiento.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Movimiento } from 'src/app/shared/model/movimiento.model';
import { JwtService } from 'src/app/auth/services/token.service';
import { IUsuario } from '../../../../../shared/model/token.model';
import { AhorroService } from 'src/app/shared/services/ahorro/ahorro.service';
import { Ahorro } from '../../../../../shared/model/ahorro.model';
import { UsuarioService } from 'src/app/auth/services/usuario.service';
import { UsernameService } from 'src/app/auth/services/username.service';
@Component({
  selector: 'app-crear-movimiento',
  templateUrl: './crear-movimiento.component.html',
  styleUrls: ['./crear-movimiento.component.scss']
})
export class CrearMovimientoComponent implements OnInit {
  idPresupuesto!: number | null | string;
  tipo: string | null = '';
  selectedIngreso!: Categoria;
  aplicaDescuentoEspecifico: boolean = false;
  idCuentaAhorroEspecifica: number | null | string = null;
  mostarCuentasAhorro: boolean = false;
  dataJsonConcepto: JsonConcepto[] = [];
  formulario!: FormGroup;

  constructor(
    private _movimientoService: MovimientoService,
    private _usuarioService: UsuarioService,
    private _usernameService: UsernameService,
    private _ahorroService: AhorroService,
    private _tokenService: JwtService,
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
                this.idPresupuesto = value.get("idPresupuesto");
                console.log(this.idPresupuesto)
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
  async ngOnInit(): Promise<any> {
    const username = this._usernameService.getUsername();
    const ahorro = await new Promise<any>((resolve, reject) => {
      this._ahorroService.getAhorrosAutomaticos(username).subscribe(
        {
          next: (value: Ahorro[]) => {
            if (value.length <= 1 && this.tipo == "ingreso") {
              this.aplicaDescuentoEspecifico = false;
              this.idCuentaAhorroEspecifica = null;
            } else if (value.length >= 1 && this.tipo == "ingreso") {
              this.mostarCuentasAhorro = true;
              this.aplicaDescuentoEspecifico = true;
            }
            resolve(value); // resolver la promesa con el valor del arreglo de Ahorro
          },
          error: (err: any) => {
            console.log('Error al obtener los ahorros automáticos:', err);
            reject(err);
          }
        }
      )
    });

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
    const idUsuario: IUsuario = this._tokenService.decodeToken()
     if (this.formulario.valid) {
      if (!this.idPresupuesto) {
        const movimiento: Movimiento = {
          id: null,
          importe: this.formulario.value.importe,
          tipo: this.tipo!.toUpperCase(),
          concepto: this.selectedIngreso.concepto,
          idUsuario: idUsuario.uuid!.toString(),
          idPresupuesto: null,
          contabilizable: true,
          logoConcepto: String(this.selectedIngreso.id)
        }
        // Cambiar el id por el del formulario
        if (this.aplicaDescuentoEspecifico) {
          this.idCuentaAhorroEspecifica = null;
        }
        this._movimientoService.postMovimiento2(movimiento, this.aplicaDescuentoEspecifico, idUsuario.uuid!.toString())
          .subscribe(
            {
              next: (value: any) => {
              },
              error: (err: any) => {
              }
            }
          )
      } else if (this.idPresupuesto) {
        const movimiento: Movimiento = {
          id: null,
          importe: this.formulario.value.importe,
          tipo: this.tipo!.toUpperCase(),
          concepto: this.selectedIngreso.concepto,
          idUsuario: idUsuario.uuid!,
          idPresupuesto: this.idPresupuesto,
          contabilizable: false,
          logoConcepto: String(this.selectedIngreso.id)
        }
        // Cambiar el id por el del formulario
        if (this.aplicaDescuentoEspecifico) {
          this.idCuentaAhorroEspecifica = null;
        }
        this._movimientoService.postMovimiento2(movimiento, this.aplicaDescuentoEspecifico, idUsuario.uuid!.toString())
          .subscribe()
      }
    } else {
      //
    }
  }
}
