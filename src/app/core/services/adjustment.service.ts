import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/index';
import { Adjustment } from '../models/adjustment';
import { AdjustmentDetail } from '../models/adjustment-detail';
import { API_ENDPOINT } from './api.service';

const URL = '/api/v1/adjustment';

@Injectable()
export class AdjustmentService {

  constructor(private http: HttpClient) {}

  getAllAdjustment(): Observable<Array<Adjustment>> {
    return this.http.get<Array<Adjustment>>(API_ENDPOINT + '/adjustment');
  }

  getAdjustment(sId: number): Observable<Adjustment> {
    return this.http.get<Adjustment>(API_ENDPOINT + '/adjustment/' + sId);
  }

  getTotalAdjustment(): Observable<number> {
    return this.http.get<number>(API_ENDPOINT + '/adjustment/count');
  }

}
