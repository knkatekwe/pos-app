import {Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/index';
import {MAIN_URL} from './payment-type.service';
import { Orders } from '../models/orders';
import { OrdersDetail } from '../models/orders-detail';

const URL = '/api/v1/orders';

@Injectable()
export class OrderService {

  constructor(private http: HttpClient) {

  }

  getAllOrders(): Observable<Array<Orders>> {
    return this.http.get<Array<Orders>>(MAIN_URL + URL + '/today');

  }

  getAllOrderDetails(oId: number): Observable<Array<OrdersDetail>> {
    return this.http.get<Array<OrdersDetail>>(MAIN_URL + URL + '/' + oId + '/details');

  }

  getTotalOrders(): Observable<number> {
    return this.http.get<number>(MAIN_URL + URL + '/count');
  }

  getTotalAmountForToday(): Observable<number> {
    return this.http.get<number>(MAIN_URL + URL + '/amount');
  }

  getTotalAmountForPaymentTypeToday(typeName: string): Observable<number> {
    return this.http.get<number>(MAIN_URL + URL + '/' + typeName + '/amount');
  }

}
