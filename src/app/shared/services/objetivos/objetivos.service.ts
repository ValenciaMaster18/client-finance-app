import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, shareReplay, tap } from 'rxjs';
import { Objetivo } from '../../model/objetivo.model';
import { environmentDev } from 'src/environments/environment.development';
import { JwtService } from 'src/app/auth/services/token.service';
import { IUsuario } from '../../model/token.model';

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
    private httpClient: HttpClient,
    private _jwtService: JwtService

  ) {
    this.API_URL = environmentDev.url + 'api/v1/objetivos';
  }
  getObjetivo(idObjetivo: number): Observable<Objetivo> {
    return this.httpClient.get<Objetivo>(`${this.API_URL}/${idObjetivo}`)
  }

  getAllObjetivo(idUsuario: string): Observable<Objetivo[]> {
    const params = new HttpParams().set("idUsuario", idUsuario)
    return this.httpClient.get<Objetivo[]>(`${this.API_URL}/all`, { params })
  }
  getHasObjetivo(idUsuario: string): Observable<boolean> {
    return this.httpClient.get<boolean>(`${this.API_URL}/has-objetivo/${idUsuario}`).pipe(
      tap((value: boolean) => {
        this.has_objetivo.next(value);
      }),
      shareReplay()
    )
  }
  getPageObjetivo(page: number, size: number, idUsuario: string): Observable<any> {
    return this.httpClient.get<any>(`${this.API_URL}?page=${page}&size=${size}&idUsuario=${idUsuario}`)
      .pipe(
        tap((value: any) => {
          this.objetivoSubject.next(value.content)
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
    return this.httpClient.post<any>(`${this.API_URL}`, objetivo).pipe(
      tap(() => {
        const token: IUsuario | any = this._jwtService.decodeToken();
        this.getPageObjetivo(0, 9, token.uuid!).subscribe();
      }))
  }

  putObjetivo(objetivo: Objetivo): Observable<any> {
    return this.httpClient.put(`${this.httpClient}`, objetivo)
  }

  deleteOnjetivo(idUsuario: string, idObjetivo: string): Observable<any> {
    const params = new HttpParams().set("idUsuario", idUsuario).set("idObjetivo", idObjetivo);
    return this.httpClient.delete<any>(`${this.API_URL}`, { params })
      .pipe(
        tap(() => {
          const token: IUsuario | any = this._jwtService.decodeToken();
          this.getPageObjetivo(0, 9, token.uuid!).subscribe();
        })
      )
  }

}
