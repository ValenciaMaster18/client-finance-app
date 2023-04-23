import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
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
  getManyMetricas(idPortafolio: string): Observable<MetricaInversion[]> {
    return this.httpClient.get<MetricaInversion[]>(`${this.API_URL}/metricas?idPortafolio=${idPortafolio}`)
  }
  getPageInversiones(page: number, size: number, idPortafolio: string): Observable<any> {
    return this.httpClient.get<any>(`${this.API_URL}?page=${page}&size=${size}&idPortafolio=${idPortafolio}`)
    .pipe(
      tap((inversiones: any) => this.inversionesSubject.next(inversiones.content)),
      shareReplay()
    )
  }
  getOneInversiones(idInversion: string): Observable<Inversiones> {
    return this.httpClient.get<Inversiones>(`${this.API_URL}/${idInversion}`)
  }
  postInversiones(inversiones: Inversiones): Observable<any> {
    return this.httpClient.post<any>(`${this.API_URL}`, inversiones)
  }
  putInversiones(inversiones: Inversiones): Observable<any> {
    return this.httpClient.put<any>(`${this.API_URL}`, inversiones)
  }
  pathInversiones(inversiones: Inversiones, idUsuario: string): Observable<any> {
    const params = new HttpParams().set("idUsuario", idUsuario)
    return this.httpClient.patch<any>(`${this.API_URL}/liquidar-inversion`, inversiones, { params })
  }
}
