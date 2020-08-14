import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

const AUTH = 'access_token'
const ROLE = 'role'

@Injectable()
export class JwtService{

  constructor(private cookieService: CookieService){}

  getToken(): String {
    return this.cookieService.get(AUTH);
  }

  getRole(): string{
    return this.cookieService.get(ROLE)
  }

  saveToken(cookie: string) {
    this.cookieService.set(AUTH, cookie);
  }

  saveRole(role: string) {
    this.cookieService.set(ROLE, role);
  }

  destroyToken() {
    this.cookieService.delete(AUTH);
  }

  destroyRole() {
    this.cookieService.delete(ROLE);
  }

}
