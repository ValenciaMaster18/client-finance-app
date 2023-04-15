import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { MetricaBalance } from '../../model/domain/metricabalance.model';
import { Movimiento } from '../../model/movimiento.model';

@Injectable({
  providedIn: 'root'
})
export class MovimientoService {
  API_URL: string;
  constructor(private httpClient: HttpClient) {
    this.API_URL = environment.url + 'api/v1/movimientos';
  }

  getOneMetrica(idUsuario: number): Observable<MetricaBalance> {
    return this.httpClient.get<MetricaBalance>(`${this.API_URL}/metrica/${idUsuario}`)
  }
  getMovimiento(page: number, size: number, idUsuario: number): Observable<Movimiento[]> {
    return this.httpClient.get<Movimiento[]>(`${this.API_URL}?page=${page}&size=${size}/${idUsuario}`)
  }
  getPresupuesto(page: number, size: number, idPresupuesto: number): Observable<Movimiento[]> {
    return this.httpClient.get<Movimiento[]>(`${this.API_URL}?page=${page}&size=${size}/${idPresupuesto}`)
  }
  getOneMovimiento(idMovimiento: number): Observable<Movimiento> {
    return this.httpClient.get<Movimiento>(`${this.API_URL}/${idMovimiento}`)
  }
  postMovimiento(movimiento: Movimiento): Observable<any> {
    return this.httpClient.post<any>(`${this.API_URL}/presupuesto`, movimiento)
  }
  postMovimiento2(movimiento: Movimiento, aplicaDescuentoEspecifico: boolean, idCuentaAhorroEspecifica: number): Observable<any> {
    const params = {
      aplicaDescuentoEspecifico: aplicaDescuentoEspecifico,
      idCuentaAhorroEspecifica: idCuentaAhorroEspecifica
    };
    return this.httpClient.post<any>(`${this.API_URL}/presupuesto`, movimiento, { params })
  }
  deleteMovimiento(movimiento: Movimiento): Observable<any> {
    return this.httpClient.delete<any>(`${this.API_URL}/${movimiento}`)
  }
  deleteMovimientoList(movimiento: Movimiento[]): Observable<any> {
    return this.httpClient.delete<any>(`${this.API_URL}/${movimiento}`)
  }
}
