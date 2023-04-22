import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { environmentDev } from "src/environments/environment.development";
import { Observable, tap } from "rxjs";
import { JwtService } from "./token.service";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  API_URL: string;
  API_URL_LOGOUT: string;
  constructor(
    private httpClient: HttpClient,
    private _tokenService: JwtService
     ) {
    this.API_URL = environmentDev.url + 'api/v1/auth'
    this.API_URL_LOGOUT = environmentDev.url + 'api/v1/auth/logout';
  }

  getAutenticacion(username: string, password: string): Observable<any> {
    return this.httpClient.post<any>(this.API_URL, { username, password })
      .pipe(
        tap((token) => {
          this._tokenService.setToken(token.token)
        })
      )
  }

  salirDelSistema(){
    this._tokenService.clearToken();
    return this.httpClient.get(`${this.API_URL_LOGOUT}`).subscribe()
  }

}
