import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environmentDev } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  API_URL: string;
  constructor( private httpClient: HttpClient ) {
    this.API_URL = environmentDev.url + 'api/v1/usuarios'
  }

  postRegistrarNuevoUsuario(usuario: any): Observable<any>{
    return this.httpClient.post(`${this.API_URL}/new-user`, usuario);
  }
  getUsuarioSiExiste(username: string): Observable<boolean>{
    return this.httpClient.get<boolean>(`${this.API_URL}`);
  }
}
