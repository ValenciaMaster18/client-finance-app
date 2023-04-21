import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, shareReplay, tap } from 'rxjs';
import { environmentDev } from 'src/environments/environment.development';
import { MetricaPortafolio } from '../../model/domain/metricaportafolio.model';
import { Portafolio } from '../../model/portafolio.model';
import { Presupuesto } from '../../model/presupuesto.model';
import { MetricaPresupuesto } from '../../model/domain/metricapresupuesto.model';

@Injectable({
  providedIn: 'root'
})
export class PresupuestoService {
  API_URL: string;
  presupuestoSubject: BehaviorSubject<Presupuesto[]> = new BehaviorSubject<Presupuesto[]>([]);
  presupuesto$: Observable<Presupuesto[]> = this.presupuestoSubject.asObservable();

  constructor( private httpClient: HttpClient ) {
    this.API_URL = environmentDev.url + 'api/v1/presupuestos';
  }

  getOneMetricas(idPresupuesto: string): Observable<MetricaPresupuesto>{
    return this.httpClient.get<MetricaPresupuesto>(`${this.API_URL}/metricas/${idPresupuesto}`)
  }
  getManyMetricas(username: string): Observable<MetricaPresupuesto>{
    return this.httpClient.get<MetricaPresupuesto>(`${this.API_URL}/metricas?username=${username}`)
  }
  getPortafolio(): Observable<Portafolio[]>{
    return this.httpClient.get<Portafolio[]>(`${this.API_URL}`)
  }
  getPagePresupuesto(page: number, size: number): Observable<Presupuesto[]>{
    return this.httpClient.get<Presupuesto[]>(`${this.API_URL}?page=${page}&size=${size}`).pipe(
      tap((presupuesto: Presupuesto[]) => this.presupuestoSubject.next(presupuesto)),
      shareReplay()
    )
  }
  getOnePresupuesto(idPresupuesto: number): Observable<Presupuesto>{
    return this.httpClient.get<Presupuesto>(`${this.API_URL}/${idPresupuesto}`)
  }

  postPresupuesto(presupuesto: Presupuesto): Observable<any>{
    return this.httpClient.post<any>(`${this.API_URL}`, presupuesto)
  }
  putPresupuesto(presupuesto: Presupuesto): Observable<any>{
    return this.httpClient.put<any>(`${this.API_URL}`, presupuesto)
  }
  deletePresupuesto(body: Presupuesto): Observable<any>{
    return this.httpClient.delete<any>(`${this.API_URL}`, { body })
  }
}
