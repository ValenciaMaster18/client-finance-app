import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-consejo',
  templateUrl: './consejo.component.html',
  styleUrls: ['./consejo.component.scss']
})
export class ConsejoComponent {
  @Input() mensaje: string = '';
}
