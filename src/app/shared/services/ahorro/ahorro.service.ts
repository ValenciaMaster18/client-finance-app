import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environmentDev } from 'src/environments/environment.development';
import { BehaviorSubject, Observable, shareReplay, tap } from 'rxjs';
import { MetricaAhorros } from '../../model/domain/metricaahorro.model';
import { Ahorro } from '../../model/ahorro.model';

@Injectable({
  providedIn: 'root'
})
export class AhorroService {

  API_URL: string;
  ahorroSubject: BehaviorSubject<Ahorro[]> = new BehaviorSubject<Ahorro[]>([]);
  ahorro$: Observable<Ahorro[]> = this.ahorroSubject.asObservable();

  constructor(private httpClient: HttpClient) {
    this.API_URL = environmentDev.url + 'api/v1/ahorros';
  }

  getAhorro(page: number, size: number, idUsuario: string): Observable<any> {
    return this.httpClient.get<any>(`${this.API_URL}?page=${page}&size=${size}&idUsuario=${idUsuario}`)
      .pipe(
        tap((value: any) => {
          this.ahorroSubject.next(value.content);
        })
      )
  }

  getOneAhorro(idAhorro: string): Observable<Ahorro> {
    return this.httpClient.get<Ahorro>(`${this.API_URL}/metricas/${idAhorro}`)
  }

  getCanShowMetricas(idUser: string): Observable<boolean> {
    return this.httpClient.get<boolean>(`${this.API_URL}/can-show-metricas${idUser}`)
  }
  getOneMetricas(idAhorro: string): Observable<MetricaAhorros> {
    return this.httpClient.get<MetricaAhorros>(`${this.API_URL}/metricas/${idAhorro}`)
  }
  getManyMetricas(idUsuario: string): Observable<MetricaAhorros> {
    return this.httpClient.get<MetricaAhorros>(`${this.API_URL}/metricas?idUsuario=${idUsuario}`)
  }

  getAhorrosAutomaticos(username: string): Observable<Ahorro[]> {
    return this.httpClient.get<Ahorro[]>(`${this.API_URL}/ahorros-automaticos?username=${username}`)
  }

  getHasCondicionAhorro(idAhorro: string): Observable<boolean> {
    return this.httpClient.get<boolean>(`${this.API_URL}/has-condicion/${idAhorro}`)
  }

  postAhorro(ahorro: Ahorro): Observable<any> {
    return this.httpClient.post<any>(`${this.API_URL}`, ahorro);
  }
  putTranferenciaHaciaDisponibleAhorro(ahorro: Ahorro, importeToTransfer: number): Observable<any> {
    const params = { importeToTransfer: importeToTransfer }
    return this.httpClient.post<any>(`${this.API_URL}/transferencia-hacia-disponible`, ahorro, { params });
  }
  putTranferenciaDesdeDisponibleAhorro(ahorro: Ahorro, importeToTransfer: number): Observable<any> {
    const params = { importeToTransfer: importeToTransfer }
    return this.httpClient.post<any>(`${this.API_URL}/transferencia-desde-disponible`, ahorro, { params });
  }

  deleteAhorro(idAhorro: number): Observable<any> {
    const params = { idAhorro: idAhorro }
    return this.httpClient.delete<any>(`${this.API_URL}`)
  }
}
