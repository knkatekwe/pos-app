import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/index';
import {HttpClient} from '@angular/common/http';
import { PaymentType } from '../models/payment-type';
import { API_ENDPOINT } from './api.service';

@Injectable()
export class PaymentTypeService {

  constructor(private http: HttpClient) { }

  getAllPaymentTypes(): Observable<Array<PaymentType>> {
    return this.http.get<Array<PaymentType>>(API_ENDPOINT + '/payment-types');
  }

  deletePaymentType(typeName: string): Observable<boolean> {
    return this.http.delete<boolean>(API_ENDPOINT + '/payment-types/' + typeName);
  }

  savePaymentType(paymentType: PaymentType): Observable<boolean> {
    return this.http.post<boolean>(API_ENDPOINT + '/payment-types', paymentType);
  }

  getTotalPaymentTypes(): Observable<number> {
    return this.http.get<number>(API_ENDPOINT + '/payment-types/count');
  }

  searchPaymentType(typeName: string): Observable<PaymentType> {
    return this.http.get<PaymentType>(API_ENDPOINT + '/payment-types/' + typeName);
  }
}
