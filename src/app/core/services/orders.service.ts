import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/index';
import { Orders } from '../models/orders';
import { API_ENDPOINT } from './api.service';
import { PaymentType } from '../models/payment-type';

const URL = '/api/v1/orders';

@Injectable()
export class OrderService {

  results = [];
	paymentSummary: { type; value };
  paymentType: PaymentType[] = [];

	constructor(private http: HttpClient) {}

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

  // getTotalForPaymentTypeToday(){
	// 	this.http.get<Array<PaymentType>>(API_ENDPOINT + '/payment-types').subscribe((res) => (this.paymentType = res));
	// 	let amount;
	// 	for (let i = 0; i < this.paymentType.length; i++) {
	// 		  (amount = this.http.get<any>(API_ENDPOINT + '/orders/' + this.paymentType[i].typeName + '/amount')),
	// 			(this.paymentSummary.type = this.paymentType[i].typeName),
	// 			(this.paymentSummary.value = amount),
	// 			this.results.push(this.paymentSummary);
	// 		  console.log('...nda svika nepano...');
  //   }
  //   return this.results;
	// }

}
