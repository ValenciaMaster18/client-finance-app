import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environmentDev } from 'src/environments/environment.development';
import { User } from 'src/app/shared/model/usuario.model';
import { UsernameService } from './username.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  API_URL: string;
  idUsuario!: number;
  username: string = '';
  constructor(
    private httpClient: HttpClient,
    private _usernameService: UsernameService
    ) {
    this.API_URL = environmentDev.url + 'api/v1/usuarios'
  }

  postRegistrarNuevoUsuario(usuario: User): Observable<any> {
    return this.httpClient.post(`${this.API_URL}/new-user`, usuario);
  }
  getUsuarioSiExiste(username: string): Observable<boolean> {
    const params = new HttpParams().set('username', username);
    return this.httpClient.get<boolean>(`${this.API_URL}`, { params }).pipe(
      tap((value: boolean) => {
        if (value) {
          this._usernameService.setUsername(username)
        }
      })
    )
  }
  // getDetailsUsername(username: string): Observable<any> {
  //   console.log("sadsd"+ username )
  //   return this.httpClient.get<any>(`${this.API_URL}/details/${username}`)
  //     .pipe(
  //       tap((value: any) => {
  //         this.idUsuario = value;
  //       })
  //     );
  // }
}
