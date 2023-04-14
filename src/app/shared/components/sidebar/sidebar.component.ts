import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
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