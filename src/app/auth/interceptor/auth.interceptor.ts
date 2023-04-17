import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtService } from '../services/token.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private _tokenService: JwtService
  ) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    // Se obtiene el token JWT del servicio TokenService.
    const idToken = this._tokenService.getToken();
    // Si el token JWT está presente, se clona la solicitud original y se agrega un encabezado "Authorization" con el token JWT.
    if (idToken) {
      const cloned = request.clone({
        headers: request.headers.set("Authorization",
          "Bearer " + idToken)
      });
      // Se llama al siguiente interceptor HTTP en la cadena con la solicitud clonada que contiene el token JWT.
      return next.handle(cloned);
    }
    // Si el token JWT no está presente, se llama al siguiente interceptor HTTP en la cadena con la solicitud original sin modificaciones.
    else {
      return next.handle(request);
    }
  }
}
