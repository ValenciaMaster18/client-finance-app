import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { environmentDev } from "src/environments/environment.development";
import { Observable, tap } from "rxjs";
import { Token } from '@angular/compiler';
import { JwtService } from "./token.service";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  API_URL: string;

  constructor(
    private httpClient: HttpClient,
    private _tokenService: JwtService
     ) {
    this.API_URL = environmentDev.url + 'api/v1/auth'
  }

  getAutenticacion(username: string, password: string): Observable<any> {
    return this.httpClient.post<any>(this.API_URL, { username, password })
      .pipe(
        tap((token) => {
          this._tokenService.setToken(token.token)
        })
      )
  }
}
