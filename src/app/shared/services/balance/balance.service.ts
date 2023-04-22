import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environmentDev } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class BalanceService {
  API_URL: string;

  constructor(private httpClient: HttpClient) {
    this.API_URL = environmentDev.url + 'api/v1/balance';
  }

  getBalance(idUsuario: string): Observable<number>{
    return this.httpClient.get<number>(`${this.API_URL}/${idUsuario}`)
  }
}
