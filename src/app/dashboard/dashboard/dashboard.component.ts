import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
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
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Router } from '@angular/router';

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
    private _authService: AuthService,
    private router: Router,
    private _portafolioService: PortafolioService,
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
      this.subscription = this._ahorroService.getAhorro(0, 1000, token.uuid!).subscribe({
        next: (value: Ahorro[]) => {
          resolve(value);
        },
        error: (error) => {
          reject(error);
        }
      });
    });

    const portafolioPromise = new Promise<Portafolio[]>((resolve, reject) => {
      this.subscription = this._portafolioService.getPortafolio(0, 1000).subscribe({
        next: (value: Portafolio[]) => {
          resolve(value);
        },
        error: (error) => {
          reject(error);
        }
      });
    });

    const presupuestoPromise = new Promise<Presupuesto[]>((resolve, reject) => {
      this.subscription = this._presupuestoService.getPagePresupuesto(0, 1000).subscribe({
        next: (value: Presupuesto[]) => {
          resolve(value);
        },
        error: (error) => {
          reject(error);
        }
      });
    });

    const objetivosPromise = new Promise<Objetivo[]>((resolve, reject) => {
      this.subscription = this._objetivosService.getPageObjetivo(0, 1000, token.uuid).subscribe({
        next: (value: Objetivo[]) => {
          resolve(value);
        },
        error: (error) => {
          reject(error);
        }
      });
    });

    const movimientoPromise = new Promise<Movimiento[]>((resolve, reject) => {
      this.subscription = this._movimientoService.getMovimiento(0, 1000, token.uuid).subscribe({
        next: (value: Movimiento[]) => {
          resolve(value);
        },
        error: (error) => {
          reject(error);
        }
      });
    });
    // , ahorroPromise , ahorro console.log('Ahorro:', ahorro);
    Promise.all([ahorroPromise, portafolioPromise, presupuestoPromise, objetivosPromise, movimientoPromise])
      .then(([ahorro, portafolio, presupuesto, objetivos, movimiento]) => {
        // console.log('Portafolio:', portafolio);
        // console.log('Presupuesto:', presupuesto);
        // console.log('Objetivos:', objetivos);
        // console.log('Movimiento:', movimiento);
        // console.log('Ahorro:', ahorro);
        this.mostrarCarga = false;
      })
      .catch((error) => {
        this.mostrarCarga = false;
        Swal.fire({
          title: 'Toeken expirado',
          text: "Vuelve a iniciar sesion",
          icon: 'warning',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Volver a iniciar sesion'
        }).then((result) => {
          if (result.isConfirmed) {
            this._authService.salirDelSistema()
            this.router.navigate(['/auth/login']);
          }else{
            Swal.fire({
              position: 'center',
              icon: 'error',
              title: 'No tienes token, vuelva a iniciar sesion',
              showConfirmButton: false,
              timer: 3000
            })
            this._authService.salirDelSistema()
            this.router.navigate(['/auth/login']);
          }
        })
      });


    // Calcula el tamaño de la ventana y aplica el estado del menú desplegable
    this.screenWidth = window.innerWidth;
    if (this.screenWidth > 998) {
      this.estadoMenuDesplegable = "block";
    }
  }

  @HostListener('window:scroll', ['$event'])
  checkScroll() {
    const scrollPosition = window.pageYOffset;
    if (scrollPosition >= 80) {
      this.isSticky = true;
    } else {
      this.isSticky = false;
    }
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
  }
}
