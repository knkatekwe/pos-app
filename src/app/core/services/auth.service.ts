import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/index';
import {MAIN_URL} from './payment-type.service';
import {map} from 'rxjs/internal/operators';
import {Router} from '@angular/router';
import { User } from '../models/user';

const URL = '/api/v1/login';

@Injectable()
export class AuthService {

  constructor(private http: HttpClient, private router: Router) {
  }

  login(user: User): Observable<boolean> {
    return this.http.post<boolean>(MAIN_URL + URL, user)
      .pipe(
        map((result) => {
          sessionStorage.setItem('token', result + '');
          if (result) {
            this.router.navigate(['/main/dashboard']);
          }
          return result;
        })
      );
  }

  isAuthenticated(): boolean {
    if (sessionStorage.getItem('token')) {
      return sessionStorage.getItem('token') == 'false' ? false : true;
    }
  }

  logout(): void {
    sessionStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}