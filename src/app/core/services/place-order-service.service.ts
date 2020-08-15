import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/index';
import { PlaceOrder } from '../models/place-order';
import { Orders } from '../models/orders';
import { API_ENDPOINT } from './api.service';

const URL = '/api/v1/placeorder';
@Injectable()
export class PlaceOrderServiceService {

  constructor(private http: HttpClient) { }

  placeOrder(placeorders: PlaceOrder): Observable<boolean> {
    return this.http.post<boolean>(API_ENDPOINT + '/placeorder', placeorders);
  }

  getAllOrders(): Observable<Array<Orders>> {
    return this.http.get<Array<Orders>>(API_ENDPOINT + '/placeorder');
  }

  getTotalOrders(): Observable<number> {
    return this.http.get<number>(API_ENDPOINT + '/placeorder/count');
  }
}
