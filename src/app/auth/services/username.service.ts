import { Injectable } from "@angular/core";

@Injectable(
  {
    providedIn: 'root'
  }
)
export class UsernameService {

  setUsername(username: string): void{
    localStorage.setItem("username", username);
  }
  getUsername(): string{
    return localStorage.getItem("username")!
  }
}
