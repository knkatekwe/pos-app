import {Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/index';
import {MAIN_URL} from './payment-type.service';
import {Stock} from '../dtos/stock';
import {StockDetail} from '../dtos/stock-detail';

const URL = '/api/v1/stock';

@Injectable()
export class StockService {

  constructor(private http: HttpClient) {

  }

  getAllStock(): Observable<Array<Stock>> {
    return this.http.get<Array<Stock>>(MAIN_URL + URL);

  }

  getAllStockDetails(sId: number): Observable<Array<StockDetail>> {
    return this.http.get<Array<StockDetail>>(MAIN_URL + URL + '/' + sId + '/details');

  }

  getTotalStock(): Observable<number> {
    return this.http.get<number>(MAIN_URL + URL + '/count');

  }

}
