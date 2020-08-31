import {Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/index';
import { Orders } from '../models/orders';
import { API_ENDPOINT } from './api.service';

const URL = '/api/v1/orders';

@Injectable()
export class OrderService {

  constructor(private http: HttpClient) {

  }

  getAllOrders(): Observable<Array<Orders>> {
    return this.http.get<Array<Orders>>(API_ENDPOINT + '/orders');

  }

  getAllOrdersToday(): Observable<Array<Orders>> {
    return this.http.get<Array<Orders>>(API_ENDPOINT + '/orders/today');

  }

  getAllOrdersByDates(startDate: string, endDate: string): Observable<Array<Orders>> {
    return this.http.get<Array<Orders>>(API_ENDPOINT + '/orders/dates/' + startDate + '/' + endDate);

  }

  getAllOrderDetails(oId: number): Observable<Orders> {
    return this.http.get<Orders>(API_ENDPOINT + '/orders/' + oId);

  }

  getOrderDetail(): Observable<Orders> {
    return this.http.get<Orders>(API_ENDPOINT + '/orders/last');

  }

  getTotalOrders(): Observable<number> {
    return this.http.get<number>(API_ENDPOINT + '/orders/count');
  }

  getTotalAmountForToday(): Observable<number> {
    return this.http.get<number>(API_ENDPOINT + '/orders/amount');
  }

  getTotalAmountForPaymentTypeToday(typeName: string): Observable<number> {
    return this.http.get<number>(API_ENDPOINT + '/orders/' + typeName + '/amount');
  }

}
