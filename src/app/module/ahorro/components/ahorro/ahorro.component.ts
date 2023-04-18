import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { AhorroService } from '../../../../shared/services/ahorro/ahorro.service';
import { Ahorro } from 'src/app/shared/model/activos.model';

@Component({
  selector: 'app-ahorro',
  templateUrl: './ahorro.component.html',
  styleUrls: ['./ahorro.component.scss']
})
export class AhorroComponent {
  data: string[] = ["asd", "das", "dsa"]
  // Dialog
  visibleEnviar: boolean = false;
  visibleHacia: boolean = false;

  responsiveOptionsGrafico: any[];
  objetivos: Ahorro[]
  subscription: Subscription;

  constructor(private _ahorroService: AhorroService) {
    this.objetivos = []
    this.subscription = new Subscription()
    this.responsiveOptionsGrafico = [
      {
        breakpoint: '1199px',
        numVisible: 1,
        numScroll: 1
      },
      {
        breakpoint: '991px',
        numVisible: 2,
        numScroll: 1
      },
      {
        breakpoint: '767px',
        numVisible: 1,
        numScroll: 1
      }
    ];
  }
  ngOnInit(): void {
    this.subscription = this._ahorroService.ahorro$.subscribe(
      {
        next: (value: Ahorro[]) => {
          this.objetivos = value;
        },
        error: (err: any) => {
          //
        },
        complete: () => {
          //
        }
      }
    )
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
  showDialogVisibleEnviar() {
    this.visibleEnviar = !this.visibleEnviar;
  }
  showDialogVisibleHacia() {
    this.visibleHacia = !this.visibleHacia;
  }
}
