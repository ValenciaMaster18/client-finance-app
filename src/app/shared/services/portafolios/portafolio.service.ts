import { Injectable } from '@angular/core';
import { environmentDev } from 'src/environments/environment.development';
import { HttpClient, HttpParams } from '@angular/common/http';
import { MetricaPortafolio } from '../../model/domain/metricaportafolio.model';
import { BehaviorSubject, Observable, shareReplay, tap } from 'rxjs';
import { Portafolio } from '../../model/portafolio.model';
import { UsernameService } from 'src/app/auth/services/username.service';

@Injectable({
  providedIn: 'root'
})
export class PortafolioService {
  API_URL: string;
  portafolioSubject: BehaviorSubject<Portafolio[]> = new BehaviorSubject<Portafolio[]>([]);
  portafolio$: Observable<Portafolio[]> = this.portafolioSubject.asObservable();
  constructor(
    private httpClient: HttpClient,
    private _usernameService: UsernameService
    ) {
    this.API_URL = environmentDev.url + 'api/v1/portafolios';
  }

  getOneMetrica(idPortafolio: string): Observable<MetricaPortafolio> {
    return this.httpClient.get<MetricaPortafolio>(`${this.API_URL}/metricas/${idPortafolio}`)
  }
  getManyMetrica(username: string): Observable<MetricaPortafolio[]> {
    return this.httpClient.get<MetricaPortafolio[]>(`${this.API_URL}/metricas?username=${username}`)
  }

  getAllPortafolio(username: string): Observable<Portafolio[]> {
    const params = new HttpParams().set("username", username);
    return this.httpClient.get<Portafolio[]>(`${this.API_URL}/all`, { params })
      .pipe(
        tap((portafolio: Portafolio[]) => this.portafolioSubject.next(portafolio)),
        shareReplay()
      )
  }
  getPortafolio(page: number, size: number): Observable<any> {
    return this.httpClient.get<any>(`${this.API_URL}?page=${page}&size=${size}`)

  }
  getOnePortafolio(idPortafolio: number): Observable<Portafolio> {
    return this.httpClient.get<Portafolio>(`${this.API_URL}/${idPortafolio}`)
  }
  postPortafolio(portafolio: Portafolio): Observable<any> {
    return this.httpClient.post<any>(`${this.API_URL}`, portafolio)
      .pipe(
        tap(() => {
          const username = this._usernameService.getUsername();
          this.getAllPortafolio(username).subscribe()
        })
      )
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
