import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  @Input() estado: string = "none";
  @Output() estadoDesplegarMenu: EventEmitter<string> = new EventEmitter();

  constructor(
    private _authService: AuthService,
    private router: Router
  ){}

  emitirEstadoDesplegarMenu(): void {
    if (this.estado == "none") {
      this.estado = "block";
      this.estadoDesplegarMenu.emit(this.estado);
      return
    }
    this.estado = "none";
    this.estadoDesplegarMenu.emit(this.estado);
  }
  cerrarSesion(): void {
    this._authService.salirDelSistema();
    this.router.navigate(['/auth/login']);
    Swal.fire({
      title: 'Salistes del sistema',
      text: "Gracias por usar tu software de getion financiera",
      icon: 'warning',
      showConfirmButton: false,
      timer: 3500
    })
  }
}
