import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Balance } from '../../model/domain/metricabalance.model';
import * as numeral from 'numeral';
import { Subscription } from 'rxjs';
import { MovimientoService } from '../../services/movimientos/movimiento.service';
import { JsonConcepto } from '../../model/jsonconcepto.model';

@Component({
  selector: 'app-tabla-met-moviento',
  templateUrl: './tabla-met-moviento.component.html',
  styleUrls: ['./tabla-met-moviento.component.scss']
})
export class TablaMetMovientoComponent {
  numeral = numeral;
  logoConcepto: any[] = [];
  @Input() concepto: string[] = [];
  @Input() valores: any;

}
