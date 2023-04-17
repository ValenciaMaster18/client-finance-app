import { Component, Input } from '@angular/core';
import { Movimiento } from 'src/app/shared/model/movimiento.model';

@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.scss']
})
export class TablaComponent {
  @Input() dataMovimiento: Movimiento[] = [];
}
