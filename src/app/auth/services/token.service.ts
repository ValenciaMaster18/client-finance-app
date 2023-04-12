import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JwtService {
  private token!: string | null;

  constructor() {}

  /**
   *
   * @returns
      El método getToken() devuelve el valor de la propiedad token si existe, de lo contrario, se obtiene el token del almacenamiento de sesión.
   */
  getToken(): string | null{
    return this.token! || sessionStorage.getItem('token');
  }

  setToken(token: string): void {
    this.token = token;
    sessionStorage.setItem('token', token);
  }

  clearToken(): void {
    this.token = null;
    sessionStorage.removeItem('token');
  }
}
