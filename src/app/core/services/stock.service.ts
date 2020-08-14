import {Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/index';
import {MAIN_URL} from './payment-type.service';
import { Stock } from '../models/stock';
import { StockDetail } from '../models/stock-detail';

const URL = '/api/v1/stock';

@Injectable()
export class StockService {

  constructor(private http: HttpClient) {

  }

  getAllStock(): Observable<Array<Stock>> {
    return this.http.get<Array<Stock>>(MAIN_URL + URL);

  }

  getStock(sId: number): Observable<Stock> {
    return this.http.get<Stock>(MAIN_URL + URL + '/' + sId);

  }

  getTotalStock(): Observable<number> {
    return this.http.get<number>(MAIN_URL + URL + '/count');

  }

}
