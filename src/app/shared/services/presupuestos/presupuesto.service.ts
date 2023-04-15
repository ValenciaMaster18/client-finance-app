import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MetricaPortafolio } from '../../model/domain/metricaportafolio.model';
import { Portafolio } from '../../model/portafolio.model';
import { Presupuesto } from '../../model/presupuesto.model';

@Injectable({
  providedIn: 'root'
})
export class PresupuestoService {
  API_URL: string;
  constructor( private httpClient: HttpClient ) {
    this.API_URL = environment.url + 'api/v1/presupuestos';
  }

  getOneMetricas(idPresupuesto: number): Observable<MetricaPortafolio>{
    return this.httpClient.get<MetricaPortafolio>(`${this.API_URL}/metricas/${idPresupuesto}`)
  }
  getManyMetricas(): Observable<MetricaPortafolio[]>{
    return this.httpClient.get<MetricaPortafolio[]>(`${this.API_URL}/metricas`)
  }
  getPortafolio(): Observable<Portafolio[]>{
    return this.httpClient.get<Portafolio[]>(`${this.API_URL}`)
  }
  getPagePresupuesto(page: number, size: number): Observable<Presupuesto[]>{
    return this.httpClient.get<Presupuesto[]>(`${this.API_URL}`)
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
