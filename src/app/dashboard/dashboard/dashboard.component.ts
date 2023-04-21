import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UsuarioService } from 'src/app/auth/services/usuario.service';
import { Movimiento } from 'src/app/shared/model/movimiento.model';
import { InversionService } from 'src/app/shared/services/inversiones/inversion.service';
import { MovimientoService } from 'src/app/shared/services/movimientos/movimiento.service';
import { ObjetivosService } from 'src/app/shared/services/objetivos/objetivos.service';
import { PortafolioService } from 'src/app/shared/services/portafolios/portafolio.service';
import { PresupuestoService } from 'src/app/shared/services/presupuestos/presupuesto.service';
import { JwtService } from '../../auth/services/token.service';
import { IUsuario } from 'src/app/shared/model/token.model';
import { Portafolio } from 'src/app/shared/model/portafolio.model';
import { Presupuesto } from 'src/app/shared/model/presupuesto.model';
import { Inversiones } from 'src/app/shared/model/inversiones.model';
import { Objetivo } from 'src/app/shared/model/objetivo.model';
import { AhorroService } from 'src/app/shared/services/ahorro/ahorro.service';
import { Ahorro } from 'src/app/shared/model/ahorro.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  mostrarCarga: boolean = true;
  estadoMenuDesplegable: string = "none";
  isSticky: boolean = false;
  screenWidth!: number;

  // Finalizar la suscripcion
  subscription: Subscription;
  constructor(
    private _movimientoService: MovimientoService,
    private _jwtService: JwtService,
    private _portafolioService: PortafolioService,
    private _inversionService: InversionService,
    private _presupuestoService: PresupuestoService,
    private _objetivosService: ObjetivosService,
    private _ahorroService: AhorroService

  ) {
    this.subscription = new Subscription();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
  async ngOnInit(): Promise<any> {
    const token: IUsuario | any = this._jwtService.decodeToken();

    const ahorroPromise = new Promise<Ahorro[]>((resolve, reject) => {
      this.subscription = this._ahorroService.getAhorro(0, 9, token.uuid!).subscribe({
        next: (value: Ahorro[]) => {
          resolve(value);
        },
        error: (error) => {
          reject(error);
        }
      });
    });
    
    const portafolioPromise = new Promise<Portafolio[]>((resolve, reject) => {
      this.subscription = this._portafolioService.getPortafolio(0, 9).subscribe({
        next: (value: Portafolio[]) => {
          resolve(value);
        },
        error: (error) => {
          reject(error);
        }
      });
    });

    const presupuestoPromise = new Promise<Presupuesto[]>((resolve, reject) => {
      this.subscription = this._presupuestoService.getPagePresupuesto(0, 9).subscribe({
        next: (value: Presupuesto[]) => {
          resolve(value);
        },
        error: (error) => {
          reject(error);
        }
      });
    });

    const inversionesPromise = new Promise<Inversiones[]>((resolve, reject) => {
      this.subscription = this._inversionService.getPageInversiones(0, 9, token.uuid).subscribe({
        next: (value: Inversiones[]) => {
          resolve(value);
        },
        error: (error) => {
          reject(error);
        }
      });
    });

    const objetivosPromise = new Promise<Objetivo[]>((resolve, reject) => {
      this.subscription = this._objetivosService.getPageObjetivo(0, 7, token.uuid).subscribe({
        next: (value: Objetivo[]) => {
          resolve(value);
        },
        error: (error) => {
          reject(error);
        }
      });
    });

    const movimientoPromise = new Promise<Movimiento[]>((resolve, reject) => {
      this.subscription = this._movimientoService.getMovimiento(0, 9, token.uuid).subscribe({
        next: (value: Movimiento[]) => {
          resolve(value);
        },
        error: (error) => {
          reject(error);
        }
      });
    });

    Promise.all([portafolioPromise, presupuestoPromise, inversionesPromise, objetivosPromise, movimientoPromise, ahorroPromise])
      .then(([portafolio, presupuesto, inversiones, objetivos, movimiento, ahorro]) => {
        console.log('Portafolio:', portafolio);
        console.log('Presupuesto:', presupuesto);
        console.log('Inversiones:', inversiones);
        console.log('Objetivos:', objetivos);
        console.log('Movimiento:', movimiento);
        console.log('Ahorro:', ahorro);
      })
      .catch((error) => {
        console.log('Error al obtener los datos:', error);
      });


    // Calcula el tamaño de la ventana y aplica el estado del menú desplegable
    this.screenWidth = window.innerWidth;
    if (this.screenWidth > 998) {
      this.estadoMenuDesplegable = "block";
    }
    this.mostrarCarga = false;
  }

  @HostListener('window:scroll', ['$event'])
  checkScroll() {
    const scrollPosition = window.pageYOffset;
    if (scrollPosition >= 80) {
      this.isSticky = true;
    } else {
      this.isSticky = false;
    }
    console.log(scrollPosition)
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.screenWidth = window.innerWidth;
    if (this.screenWidth > 998) {
      this.estadoMenuDesplegable = "block";
    }
  }
  escucharEstadoDesplegarMenu(event: string): void {
    this.estadoMenuDesplegable = event;
    console.log(this.estadoMenuDesplegable)
  }
}
