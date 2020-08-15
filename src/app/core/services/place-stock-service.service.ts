import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/index';
import { PlaceStock } from '../models/place-stock';
import { Stock } from '../models/stock';
import { API_ENDPOINT } from './api.service';

const URL = '/api/v1/placestock';
@Injectable()
export class PlaceStockServiceService {

  constructor(private http: HttpClient) { }

  placeStock(placestock: PlaceStock): Observable<boolean> {
    return this.http.post<boolean>(API_ENDPOINT + '/placestock', placestock);
  }

  getAllStock(): Observable<Array<Stock>> {
    return this.http.get<Array<Stock>>(API_ENDPOINT + '/placestock');
  }

  getTotalStock(): Observable<number> {
    return this.http.get<number>(API_ENDPOINT + '/placestock/count');
  }
}
