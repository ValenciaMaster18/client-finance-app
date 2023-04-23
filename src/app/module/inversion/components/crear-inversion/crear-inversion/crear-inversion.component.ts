import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { InversionService } from '../../../../../shared/services/inversiones/inversion.service';
import { Inversiones } from '../../../../../shared/model/inversiones.model';
import { Portafolio } from 'src/app/shared/model/portafolio.model';
import { PortafolioService } from '../../../../../shared/services/portafolios/portafolio.service';
import { UsernameService } from 'src/app/auth/services/username.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-inversion',
  templateUrl: './crear-inversion.component.html',
  styleUrls: ['./crear-inversion.component.scss']
})
export class CrearInversionComponent implements OnInit, OnDestroy {
  nombrePortafolio: Portafolio[] = []
  nombre: string = '';
  simulacion: boolean = false;
  perfilDeRiesgo: string[] = ["ALTO", "MODERADO", "BAJO"];
  plazoInversion: string[] = ["CORTO", "MEDIANO", "LARGO"];
  tipoActivo: string[] = ["ACCIONES", "BONOS", "FONDOS_MUTUOS", "MATERIAS_PRIMAS", "CRIPTOMONEDAS", "OTROS"];
  sectorActivo: string[] = ["FINANCIERO", "TECNOLOGICO", "CONSTRUCTIVO", "COMERCIAL", "OTROS"];
  simulada: string[] = ["SI", "NO"];

  formulario: FormGroup;
  subscription: Subscription;
  constructor(
    private formBuilder: FormBuilder,
    private _inversioneService: InversionService,
    private _usernameService: UsernameService,
    private _portafolioService: PortafolioService
  ) {
    this.subscription = new Subscription()
    this.formulario = this.formBuilder.group(
      {
        nombrePortafolio: ['', Validators.required],
        nombre: ['', Validators.required],
        descripcion: ['', Validators.required],
        precio: ['', Validators.required],
        cantidad: ['', Validators.required],
        plazo: ['', Validators.required],
        perfilRiesgo: ['', Validators.required],
        tipo: ['', Validators.required],
        sector: ['', Validators.required],
        simulada: ['', Validators.required],
        rentabilidadEsperada: ['', Validators.required]
      }
    )
  }
  ngOnInit(): void {
    const username: string = this._usernameService.getUsername();
    this.subscription = this._portafolioService.getAllPortafolio(username).subscribe(
      {
        next: (value: Portafolio[]) => {
          this.nombrePortafolio = value;
        }
      }
    )
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
  submit(): void {
    if (this.formulario.valid) {
      if (this.formulario.value.simulada == "SI") {
        this.simulacion = true;
      }
      const portafolio = this.nombrePortafolio.filter(element => element.nombre == this.formulario.value.nombrePortafolio)

      // Nota validar nombre de portafolio y pasar id
      const inversiones: Inversiones = {
        idPortafolio: portafolio[0].id,
        nombre: this.formulario.value.nombre,
        descripcion: this.formulario.value.descripcion,
        precio: this.formulario.value.precio,
        cantidad: this.formulario.value.cantidad,
        plazo: this.formulario.value.plazo,
        perfilRiesgo: this.formulario.value.perfilRiesgo,
        tipo: this.formulario.value.tipo,
        sector: this.formulario.value.sector,
        simulada: this.simulacion,
        rentabilidadEsperada: this.formulario.value.rentabilidadEsperada
      }
      this.subscription = this._inversioneService.postInversiones(inversiones).subscribe(
        {
          next: (value: any) => {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Inversion creada',
              showConfirmButton: false,
              timer: 1500
            })
            this.formulario.reset()
          },
          error: (err: any) => {
            Swal.fire({
              position: 'center',
              icon: 'error',
              title: 'Inversion no creado',
              showConfirmButton: false,
              timer: 3000
            })
          },
          complete: () => {

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
