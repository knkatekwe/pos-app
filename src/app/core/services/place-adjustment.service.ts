import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/index';
import {MAIN_URL} from './payment-type.service';
import { PlaceAdjustment } from '../models/place-adjustment';
import { Adjustment } from '../models/adjustment';

const URL = '/api/v1/placeadjustment';
@Injectable()
export class PlaceAdjustmentServiceService {

  constructor(private http: HttpClient) { }

  placeAdjustment(placeadjustment: PlaceAdjustment): Observable<boolean> {
    return this.http.post<boolean>(MAIN_URL + URL, placeadjustment);
  }

  getAllAdjustment(): Observable<Array<Adjustment>> {
    return this.http.get<Array<Adjustment>>(MAIN_URL + URL);
  }

  getTotalAdjustment(): Observable<number> {
    return this.http.get<number>(MAIN_URL + URL + '/count');
  }
}
