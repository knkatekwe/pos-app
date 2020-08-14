import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/index';
import {MAIN_URL} from './payment-type.service';
import {map} from 'rxjs/internal/operators';
import {Router} from '@angular/router';
import { User, Role } from '../models/user';
import { JwtService } from './jwt.service';

const URL = '/api/v1/login';

@Injectable()
export class AuthService {

  constructor(private http: HttpClient,
              private router: Router,
              private jwtService: JwtService) {
  }

  public isAuthenticated(): boolean {
    const token = this.jwtService.getToken()
    if(!token){
      console.log('there is no token')
      return false
    }
    console.log('yes, token is there')
    return true
  }

  hasRole(role: Role){
    return this.isAuthenticated() && this.jwtService.getRole() === role;
  }

}
