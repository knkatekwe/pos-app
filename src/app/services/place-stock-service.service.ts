import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {PlaceStock} from '../dtos/place-stock';
import {Observable} from 'rxjs/index';
import {MAIN_URL} from './payment-type.service';
import {PaymentType} from '../dtos/payment-type';
import {Stock} from '../dtos/stock';

const URL = '/api/v1/placestock';
@Injectable()
export class PlaceStockServiceService {

  constructor(private http: HttpClient) { }

  placeStock(placestock: PlaceStock): Observable<boolean> {
    return this.http.post<boolean>(MAIN_URL + URL, placestock);
  }

  getAllStock(): Observable<Array<Stock>> {
    return this.http.get<Array<Stock>>(MAIN_URL + URL);
  }

  getTotalStock(): Observable<number> {
    return this.http.get<number>(MAIN_URL + URL + '/count');
  }
}
