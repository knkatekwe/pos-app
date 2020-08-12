import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable ,  BehaviorSubject ,  ReplaySubject } from 'rxjs';

import { ApiService, API_ENDPOINT } from './api.service';
import { JwtService } from './jwt.service';
import { map ,  distinctUntilChanged } from 'rxjs/operators';
import { User, UserObject } from '../models/user';

@Injectable()
export class UserService {
  private currentUserSubject = new BehaviorSubject<User>({} as User);
  public currentUser = this.currentUserSubject.asObservable().pipe(distinctUntilChanged());

  private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();

  constructor (
    private apiService: ApiService,
    private http: HttpClient,
    private jwtService: JwtService,
  ) {}

  // Verify JWT in localstorage with server & load user's info.
  // This runs once on application startup.
  populate() {
    // If JWT detected, attempt to get & store user's info
    if (this.jwtService.getToken()) {
      this.apiService.get('/auth/user')
      .subscribe(
        data => {this.setAuth1(data);
        console.log('tapfuura nepo king, token riripo!!!!!!')},
        err => {this.purgeAuth();
          console.log(err)
          console.log('tapfuura nepano, then purged the token!!!!!!')}
      );
      //console.log()
    } else {
      // Remove any potential remnants of previous auth states
      console.log('tabva tabvisa token racho repa localStorage!!!!!')
      this.purgeAuth();
    }
    console.log()
  }

  setAuth1(user: User) {
    //console.log('token has been set!')
    // Set current user data into observable
    this.currentUserSubject.next(user);
    // Set isAuthenticated to true
    this.isAuthenticatedSubject.next(true);
  }

  setAuth(user) {
    // Save JWT sent from server in localstorage
    this.jwtService.saveToken(user.jwt);
    //console.log('token has been set!')
    // Set current user data into observable
    this.currentUserSubject.next(user.user);
    // Set isAuthenticated to true
    this.isAuthenticatedSubject.next(true);
  }

  purgeAuth() {
    // Remove JWT from localstorage
    this.jwtService.destroyToken();
    // Set current user to an empty object
    this.currentUserSubject.next({} as User);
    // Set auth status to false
    this.isAuthenticatedSubject.next(false);
  }

  // postMethod(data: any): Observable<any> {
  //    return this.http.get('http://localhost:1337/auth/local', data);
  // }

  login(credentials: any): Observable<any> {
    return this.apiService.post('/auth/signin' , credentials)
      .pipe(map(
        data => {this.setAuth(data);
        return data;
      },
        error => {return error}
    ));
  }

  register(data): Observable<any> {

    return this.apiService.post('/auth/signup' , data)
      .pipe(map(
        res => {
        console.log(res)
        return res;
      },
        err => {
          console.log(err)
          return err
        }
    ));
  }

  getCurrentUser(): User {
    return this.currentUserSubject.value;
  }

  getUser(): Observable<any>{
    return this.http.get(API_ENDPOINT + '/auth/user');
  }

  get(id): Observable<UserObject> {
    return this.apiService.get('/auth/' + id)
      .pipe(map(data => data));
  }

  // Update the user on the server (email, pass, etc)
  update(id, user): Observable<any> {
    return this.http
    .post(API_ENDPOINT + '/auth/userinfo/' + id, user)
    .pipe(map(data => {
      // Update the currentUser observable
      // this.currentUserSubject.next(data);
      return data;
    }));
  }

  changePassword(id, data): Observable<any> {
    return this.http
    .post(API_ENDPOINT + '/auth/password/' + id, data)
    .pipe(map(data => {
      // Update the currentUser observable
      // this.currentUserSubject.next(data);
      return data;
    }));
  }

}
