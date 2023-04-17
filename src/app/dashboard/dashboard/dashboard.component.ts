import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { InversionService } from 'src/app/shared/services/inversiones/inversion.service';
import { MovimientoService } from 'src/app/shared/services/movimientos/movimiento.service';
import { PortafolioService } from 'src/app/shared/services/portafolios/portafolio.service';
import { PresupuestoService } from 'src/app/shared/services/presupuestos/presupuesto.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  mostrarCarga: boolean = false;
  estadoMenuDesplegable: string = "none";
  isSticky: boolean = false;
  screenWidth!: number;

  // Finalizar la suscripcion
  subscription: Subscription;
  constructor(
    private _movimientoService: MovimientoService,
    private _portafolioService: PortafolioService,
    private _inversionService: InversionService,
    private _presupuestoService: PresupuestoService,

  ) {
    this.subscription = new Subscription();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
  ngOnInit() {
    this.mostrarCarga = true;
    // Cargamos los servicios
    // this.subscription = this._movimientoService.getMovimiento(0, 9, 1).subscribe()
    // this.subscription = this._portafolioService.getPortafolio(0, 9).subscribe()
    // this.subscription = this._inversionService.getPageInversiones(0, 9, 1).subscribe()
    // this.subscription = this._presupuestoService.getPagePresupuesto(0, 9).subscribe()

    // Calcula el tamaño de la ventana y aplica el estado del menú desplegable
    this.screenWidth = window.innerWidth;
    if (this.screenWidth > 998) {
      this.estadoMenuDesplegable = "block";
    }
    setTimeout(() => {
      this.mostrarCarga = false;
    }, 3500)
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
