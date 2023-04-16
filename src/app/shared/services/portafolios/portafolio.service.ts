import { Injectable } from '@angular/core';
import { environmentDev } from 'src/environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { MetricaPortafolio } from '../../model/domain/metricaportafolio.model';
import { BehaviorSubject, Observable, shareReplay, tap } from 'rxjs';
import { Portafolio } from '../../model/portafolio.model';

@Injectable({
  providedIn: 'root'
})
export class PortafolioService {
  API_URL: string;
  portafolioSubject: BehaviorSubject<Portafolio[]> = new BehaviorSubject<Portafolio[]>([]);
  portafolio$: Observable<Portafolio[]> = this.portafolioSubject.asObservable();
  constructor(private httpClient: HttpClient) {
    this.API_URL = environmentDev.url + 'api/v1/portafolios';
  }

  getOneMetrica(idPortafolio: number): Observable<MetricaPortafolio> {
    return this.httpClient.get<MetricaPortafolio>(`${this.API_URL}/metricas/${idPortafolio}`)
  }
  getManyMetrica(): Observable<MetricaPortafolio[]> {
    return this.httpClient.get<MetricaPortafolio[]>(`${this.API_URL}/metricas`)
  }
  getPortafolio(page: number, size: number): Observable<Portafolio[]> {
    return this.httpClient.get<Portafolio[]>(`${this.API_URL}?page=${page}&size=${size}`)
      .pipe(
        tap((portafolio: Portafolio[]) => this.portafolioSubject.next(portafolio)),
        shareReplay()
      )
  }
  getOnePortafolio(idPortafolio: number): Observable<Portafolio> {
    return this.httpClient.get<Portafolio>(`${this.API_URL}/${idPortafolio}`)
  }
  postPortafolio(portafolio: Portafolio): Observable<any> {
    return this.httpClient.post<any>(`${this.API_URL}`, portafolio)
  }
  putPortafolio(portafolio: Portafolio): Observable<any> {
    return this.httpClient.put(`${this.API_URL}`, portafolio)
  }
  getInversiones(idPortafolio: number): Observable<any> {
    return this.httpClient.get<any>(`${this.API_URL}/has-any-inversion/${idPortafolio}`)
  }
  deletePortafolio(body: Portafolio): Observable<any> {
    return this.httpClient.delete<any>(`${this.API_URL}`, { body })
  }
}
