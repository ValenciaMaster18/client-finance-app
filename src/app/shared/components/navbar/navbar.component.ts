import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  @Input() estado: string = "none";
  @Output() estadoDesplegarMenu: EventEmitter<string> = new EventEmitter();

  emitirEstadoDesplegarMenu(): void {
    if (this.estado == "none") {
      this.estado = "block";
      this.estadoDesplegarMenu.emit(this.estado);
      return
    }
    this.estado = "none";
    this.estadoDesplegarMenu.emit(this.estado);
  }
}
