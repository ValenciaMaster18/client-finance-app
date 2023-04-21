import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environmentDev } from 'src/environments/environment.development';
import { Condicion } from '../../model/condicion.model';

@Injectable({
  providedIn: 'root'
})
export class CondicionService {
  API_URL: string;

  constructor(private httpClient: HttpClient) {
    this.API_URL = environmentDev.url + 'api/v1/condiciones';
  }

  postCondicion(condicion: Condicion): Observable<any>{
    return this.httpClient.post<any>(`${this.API_URL}`, condicion)
  }
  pathCondicion(idAhorro: number): Observable<any>{
    return this.httpClient.patch<any>(`${this.API_URL}/delete-condicion`, idAhorro);
  }
}
