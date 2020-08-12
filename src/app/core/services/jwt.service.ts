import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

const AUTH = 'access_token'

@Injectable()
export class JwtService{

  constructor(private cookieService: CookieService){}

  getToken(): String {
    return this.cookieService.get(AUTH);
  }

  saveToken(cookie: string) {
    this.cookieService.set(AUTH, cookie);
  }

  destroyToken() {
    this.cookieService.delete(AUTH);
  }

}
