import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, shareReplay, tap } from 'rxjs';

import { Movimiento } from '../../model/movimiento.model';
import { MetricaBalance } from '../../model/domain/metricabalance.model';

import { environmentDev, environmentJsonDev } from 'src/environments/environment.development';
import { JsonConcepto } from '../../model/jsonconcepto.model';
import { JwtService } from 'src/app/auth/services/token.service';
import { IUsuario } from '../../model/token.model';

@Injectable({
  providedIn: 'root'
})
export class MovimientoService {

  API_URL: string;
  movimientoSubject: BehaviorSubject<Movimiento[]> = new BehaviorSubject<Movimiento[]>([]);
  movimiento$: Observable<Movimiento[]> = this.movimientoSubject.asObservable();

  constructor(
    private httpClient: HttpClient,
    private _jwtService: JwtService) {
    this.API_URL = environmentDev.url + 'api/v1/movimientos';
  }
  getConceptoLogo(): Observable<JsonConcepto[]> {
    return this.httpClient.get<JsonConcepto[]>(environmentJsonDev.url)
  }
  getOneMetrica(idUsuario: string): Observable<MetricaBalance> {
    const params = new HttpParams().set("idUsuario", idUsuario)
    return this.httpClient.get<MetricaBalance>(`${this.API_URL}/metrica/by-usuario`, { params })
  }
  getHayMetricas(idUsuario: string): Observable<boolean> {
    const params = new HttpParams().set("idUsuario", idUsuario)
    return this.httpClient.get<boolean>(`${this.API_URL}/has-any-movimiento/by-usuario`, { params })
  }
  getMovimiento(page: number, size: number, idUsuario: string): Observable<any[]> {
    const params = new HttpParams().set('page', page).set('size', size).set('idUsuario', idUsuario);
    return this.httpClient.get<any[]>(`${this.API_URL}/by-usuario`, { params })
      .pipe(
        tap((value: any) => this.movimientoSubject.next(value.content)),
        shareReplay()
      );
  }
  getPresupuesto(page: number, size: number, idPresupuesto: string): Observable<any> {
    return this.httpClient.get<any>(`${this.API_URL}/by-presupuesto?page=${page}&size=${size}&idPresupuesto=${idPresupuesto}`)
  }
  getOneMovimiento(idMovimiento: number): Observable<Movimiento> {
    return this.httpClient.get<Movimiento>(`${this.API_URL}/${idMovimiento}`)
  }
  postMovimiento(movimiento: Movimiento): Observable<any> {
    return this.httpClient.post<any>(`${this.API_URL}/presupuesto`, movimiento)
  }
  postMovimiento2(movimiento: Movimiento, aplicaDescuentoEspecifico: boolean, idCuentaAhorroEspecifica: string | number | null): Observable<any> {
    const params = {
      aplicaDescuentoEspecifico: aplicaDescuentoEspecifico,
      idCuentaAhorroEspecifica: idCuentaAhorroEspecifica!
    };
    return this.httpClient.post<any>(`${this.API_URL}`, movimiento, { params })
      .pipe(
        tap(() => {
          const token: IUsuario | any = this._jwtService.decodeToken();
          this.getMovimiento(0, 1000, token.uuid!).subscribe()
        })
      )
  }
  deleteMovimiento(movimiento: Movimiento): Observable<any> {
    return this.httpClient.delete<any>(`${this.API_URL}/${movimiento}`)
  }
  deleteMovimientoList(movimiento: Movimiento[]): Observable<any> {
    return this.httpClient.delete<any>(`${this.API_URL}/${movimiento}`)
  }
}
