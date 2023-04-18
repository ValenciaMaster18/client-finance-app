import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { environmentDev } from "src/environments/environment.development";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  API_URL: string;

  constructor( private httpClient: HttpClient ) {
    this.API_URL = environmentDev.url + 'api/v1/auth'
  }

  getAutenticacion(username: string, password: string): Observable<any> {
    return this.httpClient.post<any>(this.API_URL, { username, password })
  }
}
