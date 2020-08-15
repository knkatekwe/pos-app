import {Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Items } from '../models/items';
import { API_ENDPOINT } from './api.service';

const URL = '/api/v1/items';

@Injectable()
export class ItemService {

  constructor(private http: HttpClient) {

  }

  getAllItems(): Observable<Array<Items>> {
    return this.http.get<Array<Items>>(API_ENDPOINT + '/items');

  }

  getAllProducts(): Observable<Array<Items>> {
    return this.http.get<Array<Items>>(API_ENDPOINT + '/items/findAll');

  }

  saveItems(item: Items): Observable<boolean> {
    return this.http.post<boolean>(API_ENDPOINT + '/items', item);
  }

  deletePaymentType(id: string): Observable<boolean> {
    return this.http.delete<boolean>(API_ENDPOINT + '/items/' + id);
  }

  getTotalItems(): Observable<number> {
    return this.http.get<number>(API_ENDPOINT + '/items/count');
  }

  searchItem(code: string): Observable<Items> {
    return this.http.get<Items>(API_ENDPOINT + '/items/' + code);
  }

  public findProductByCode(code: string): Observable<Items[]> {
    if (!code) {
        return of([]);
  }
  // tslint:disable-next-line: align
  return this.http.get<Items[]>(API_ENDPOINT + '/items/product' + '/' + code);
}

}
