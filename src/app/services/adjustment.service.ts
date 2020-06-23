import {Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/index';
import {MAIN_URL} from './payment-type.service';
import {Adjustment} from '../dtos/adjustment';
import {AdjustmentDetail} from '../dtos/adjustment-detail';

const URL = '/api/v1/adjustment';

@Injectable()
export class AdjustmentService {

  constructor(private http: HttpClient) {

  }

  getAllAdjustment(): Observable<Array<Adjustment>> {
    return this.http.get<Array<Adjustment>>(MAIN_URL + URL);

  }

  getAllAdjustmentDetails(sId: number): Observable<Array<AdjustmentDetail>> {
    return this.http.get<Array<AdjustmentDetail>>(MAIN_URL + URL + '/' + sId + '/details');

  }

  getTotalAdjustment(): Observable<number> {
    return this.http.get<number>(MAIN_URL + URL + '/count');

  }

}
