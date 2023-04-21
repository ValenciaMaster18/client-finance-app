import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environmentDev } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  API_URL: string;

  constructor( private httpClient: HttpClient ) {
    this.API_URL = environmentDev.url + 'api/v1/chat';
  }

  getMessageChat(message: string): Observable<any> {
    return this.httpClient.get<any>(`${this.API_URL}?message=${message}`);
  }
}
