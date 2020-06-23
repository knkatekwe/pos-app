import {Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import {MAIN_URL} from './payment-type.service';
import {Items} from '../dtos/items';
import { catchError, map, tap } from 'rxjs/operators';

const URL = '/api/v1/items';

@Injectable()
export class ItemService {

  constructor(private http: HttpClient) {

  }

  getAllItems(): Observable<Array<Items>> {
    return this.http.get<Array<Items>>(MAIN_URL + URL);

  }

  getAllProducts(): Observable<Array<Items>> {
    return this.http.get<Array<Items>>(MAIN_URL + URL + '/findAll');

  }

  saveItems(item: Items): Observable<boolean> {
    return this.http.post<boolean>(MAIN_URL + URL, item);
  }

  deletePaymentType(id: string): Observable<boolean> {
    return this.http.delete<boolean>(MAIN_URL + URL + '/' + id);
  }

  getTotalItems(): Observable<number> {
    return this.http.get<number>(MAIN_URL + URL + '/count');
  }

  searchItem(code: string): Observable<Items> {
    return this.http.get<Items>(MAIN_URL + URL + '/' + code);
  }

  public findProductByCode(code: string): Observable<Items[]> {
    if (!code) {
        return of([]);
  }
  // tslint:disable-next-line: align
  return this.http.get<Items[]>(MAIN_URL + URL + '/product' + '/' + code);
}

}
