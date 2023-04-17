import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, shareReplay, tap } from 'rxjs';
import { Objetivo } from '../../model/objetivo.model';
import { environmentDev } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ObjetivosService {
  API_URL: string;
  objetivoSubject: BehaviorSubject<Objetivo[]> = new BehaviorSubject<Objetivo[]>([]);
  objetivoSubject$: Observable<Objetivo[]> = this.objetivoSubject.asObservable();

  has_objetivo: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  has_objetivo$: Observable<boolean> = this.has_objetivo.asObservable()

  constructor(
    private httpClient: HttpClient
  ) {
    this.API_URL = environmentDev.url + '/has-objetivo/';
  }
  getObjetivo(idObjetivo: number): Observable<Objetivo> {
    return this.httpClient.get<Objetivo>(`${this.API_URL}/${idObjetivo}`)
  }
  getHasObjetivo(idUsuario: number): Observable<boolean> {
    return this.httpClient.get<boolean>(`${this.API_URL}/${idUsuario}`).pipe(
      tap((value: boolean) => {
        this.has_objetivo.next(value);
      }),
      shareReplay()
    )
  }
  getPageObjetivo(page: number, size: number, idUsuario: number): Observable<Objetivo[]> {
    return this.httpClient.get<Objetivo[]>(`${this.API_URL}?page=${page}&size=${size}&usuarioId=${idUsuario}`)
      .pipe(
        tap((value: Objetivo[]) => {
          this.objetivoSubject.next(value)
        })
      )
  }
  getListObjetivosOfUser(idUsuario: number): Observable<Objetivo[]> {
    const params = {
      idUsuario: idUsuario
    }
    return this.httpClient.get<Objetivo[]>(`${this.API_URL}`, { params });
  }

  getObjetivoCanBeDeleted(idUsuario: number): Observable<boolean> {
    const params = {
      idUsuario: idUsuario
    }
    return this.httpClient.get<boolean>(`${this.API_URL}/verificar-borrado`, { params })
  }
  postObjetivo(objetivo: Objetivo): Observable<any> {
    return this.httpClient.post<any>(`${this.API_URL}`, objetivo);
  }

  putObjetivo(objetivo: Objetivo): Observable<any> {
    return this.httpClient.put(`${this.httpClient}`, objetivo)
  }

}
