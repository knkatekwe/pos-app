import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/index';
import {MAIN_URL} from './payment-type.service';
import { PlaceOrder } from '../models/place-order';
import { Orders } from '../models/orders';

const URL = '/api/v1/placeorder';
@Injectable()
export class PlaceOrderServiceService {

  constructor(private http: HttpClient) { }

  placeOrder(placeorders: PlaceOrder): Observable<boolean> {
    return this.http.post<boolean>(MAIN_URL + URL, placeorders);
  }

  getAllOrders(): Observable<Array<Orders>> {
    return this.http.get<Array<Orders>>(MAIN_URL + URL);
  }

  getTotalOrders(): Observable<number> {
    return this.http.get<number>(MAIN_URL + URL + '/count');
  }
}
