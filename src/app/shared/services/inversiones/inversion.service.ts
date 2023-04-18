import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, shareReplay, tap } from 'rxjs';
import { environmentDev } from 'src/environments/environment.development';
import { MetricaInversion } from '../../model/domain/metricaInversion.model';
import { Inversiones } from '../../model/inversiones.model';
@Injectable({
  providedIn: 'root'
})
export class InversionService {
  API_URL: string;
  inversionesSubject: BehaviorSubject<Inversiones[]> = new BehaviorSubject<Inversiones[]>([]);
  inversiones$: Observable<Inversiones[]> = this.inversionesSubject.asObservable();

  constructor(
    private httpClient: HttpClient
  ) {
    this.API_URL = environmentDev.url + 'api/v1/inversiones';
  }

  getOneMetricas(idInversion: number): Observable<MetricaInversion> {
    return this.httpClient.get<MetricaInversion>(`${this.API_URL}/metricas/${idInversion}`)
  }
  getManyMetricas(idPortafolio: number): Observable<MetricaInversion[]> {
    return this.httpClient.get<MetricaInversion[]>(`${this.API_URL}/metricas?idPortafolio=${idPortafolio}`)
  }
  getPageInversiones(page: number, size: number, idPortafolio: number): Observable<Inversiones[]> {
    return this.httpClient.get<Inversiones[]>(`${this.API_URL}?page=${page}&size=${size}&idPortafolio=${idPortafolio}`)
    .pipe(
      tap((inversiones: Inversiones[]) => this.inversionesSubject.next(inversiones)),
      shareReplay()
    )
  }
  getOneInversiones(idInversion: number): Observable<Inversiones[]> {
    return this.httpClient.get<Inversiones[]>(`${this.API_URL}/${idInversion}`)
  }
  postInversiones(inversiones: Inversiones): Observable<any> {
    return this.httpClient.post<any>(`${this.API_URL}`, inversiones)
  }
  putInversiones(inversiones: Inversiones): Observable<any> {
    return this.httpClient.put<any>(`${this.API_URL}`, inversiones)
  }
  pathInversiones(inversiones: Inversiones): Observable<any> {
    return this.httpClient.patch<any>(`${this.API_URL}/liquidar-inversion`, inversiones)
  }
}
