import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/index';
import { PlaceAdjustment } from '../models/place-adjustment';
import { Adjustment } from '../models/adjustment';
import { API_ENDPOINT } from './api.service';

const URL = '/api/v1/placeadjustment';
@Injectable()
export class PlaceAdjustmentServiceService {

  constructor(private http: HttpClient) { }

  placeAdjustment(placeadjustment: PlaceAdjustment): Observable<boolean> {
    return this.http.post<boolean>(API_ENDPOINT + '/placeadjustment', placeadjustment);
  }

  getAllAdjustment(): Observable<Array<Adjustment>> {
    return this.http.get<Array<Adjustment>>(API_ENDPOINT + '/placeadjustment');
  }

  getTotalAdjustment(): Observable<number> {
    return this.http.get<number>(API_ENDPOINT + '/placeadjustment/count');
  }
}
