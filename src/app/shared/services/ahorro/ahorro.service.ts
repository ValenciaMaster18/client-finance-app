import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environmentDev } from 'src/environments/environment.development';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { MetricaAhorros } from '../../model/domain/metricaahorro.model';
import { Ahorro } from '../../model/activos.model';

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

  getOneMetricas(): Observable<MetricaAhorros> {
    return this.httpClient.get<MetricaAhorros>(`${this.API_URL}`)
  }
  getOneAhorro(idAhorro: number): Observable<Ahorro>{
    return this.httpClient.get<Ahorro>(`${this.API_URL}/${idAhorro}`)
  }
  getAhorrosAutomaticos(idAhorro: number): Observable<Ahorro>{
    const params = { idAhorro: idAhorro }
    return this.httpClient.get<Ahorro>(`${this.API_URL}/ahorros-automaticos`, { params })
  }
  getAhorro(page: number, size: number): Observable<Ahorro[]> {
    return this.httpClient.get<Ahorro[]>(`${this.API_URL}?page=${page}&size=${size}`)
      .pipe(
        tap((value: Ahorro[]) => {
          this.ahorroSubject.next(value);
        })
      )
  }
  postAhorro(ahorro: Ahorro): Observable<any>{
    return this.httpClient.post<any>(`${this.API_URL}`, ahorro);
  }
  putTranferenciaHaciaDisponibleAhorro(ahorro: Ahorro, importeToTransfer: number): Observable<any>{
    const params = { importeToTransfer: importeToTransfer }
    return this.httpClient.post<any>(`${this.API_URL}/transferencia-hacia-disponible`, ahorro, { params });
  }
  postTranferenciaDesdeDisponibleAhorro(ahorro: Ahorro, importeToTransfer: number): Observable<any>{
    const params = { importeToTransfer: importeToTransfer }
    return this.httpClient.post<any>(`${this.API_URL}/transferencia-desde-disponible`, ahorro, { params });
  }
  pathCondicionAhorro(ahorro: Ahorro): Observable<any>{
    return this.httpClient.patch<any>(`${this.API_URL}/delete-condicion`, ahorro);
  }
  deleteAhorro(idAhorro: number): Observable<any>{
    const params = { idAhorro: idAhorro }
    return this.httpClient.delete<any>(`${this.API_URL}`)
  }
}
