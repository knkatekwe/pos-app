import {Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/index';
import { Stock } from '../models/stock';
import { API_ENDPOINT } from './api.service';

const URL = '/api/v1/stock';

@Injectable()
export class StockService {

  constructor(private http: HttpClient) {

  }

  getAllStock(): Observable<Array<Stock>> {
    return this.http.get<Array<Stock>>(API_ENDPOINT + '/stock');

  }

  getAllStockToday(): Observable<Array<Stock>> {
    return this.http.get<Array<Stock>>(API_ENDPOINT + '/stock/today');

  }

  getAllStockByDates(startDate: string, endDate: string): Observable<Array<Stock>> {
    return this.http.get<Array<Stock>>(API_ENDPOINT + '/orders/dates/' + startDate + '/' + endDate);

  }

  getStock(sId: number): Observable<Stock> {
    return this.http.get<Stock>(API_ENDPOINT + '/stock/' + sId);

  }

  getTotalStock(): Observable<number> {
    return this.http.get<number>(API_ENDPOINT + '/stock/count');

  }

}
