import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/index';
import {PaymentType} from '../dtos/payment-type';
import {HttpClient} from '@angular/common/http';
import {Items} from '../dtos/items';

// export const MAIN_URL = 'http://localhost:8080';
export const MAIN_URL = 'http://localhost:8080/pos-app';
const URL = '/api/v1/payment-types';

@Injectable()
export class PaymentTypeService {

  constructor(private http: HttpClient) { }

  getAllPaymentTypes(): Observable<Array<PaymentType>> {
    return this.http.get<Array<PaymentType>>(MAIN_URL + URL);
  }

  deletePaymentType(typeName: string): Observable<boolean> {
    return this.http.delete<boolean>(MAIN_URL + URL + '/' + typeName);
  }

  savePaymentType(paymentType: PaymentType): Observable<boolean> {
    return this.http.post<boolean>(MAIN_URL + URL, paymentType);
  }

  getTotalPaymentTypes(): Observable<number> {
    return this.http.get<number>(MAIN_URL + URL + '/count');
  }

  searchPaymentType(typeName: string): Observable<PaymentType> {
    return this.http.get<PaymentType>(MAIN_URL + URL + '/' + typeName);
  }
}
