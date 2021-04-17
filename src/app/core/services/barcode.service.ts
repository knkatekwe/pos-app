import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Barcodes } from '../models/bardcodes';
import { API_ENDPOINT } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class BarcodeService {

  constructor(private http: HttpClient) {
  }

  getAllBarcodes(): Observable<Array<Barcodes>> {
    return this.http.get<Array<Barcodes>>(API_ENDPOINT + '/barcodes');

  }

  getAllProducts(): Observable<Array<Barcodes>> {
    return this.http.get<Array<Barcodes>>(API_ENDPOINT + '/barcodes/findAll');

  }

  saveBarcodes(barcode: Barcodes): Observable<boolean> {
    return this.http.post<boolean>(API_ENDPOINT + '/barcodes', barcode);
  }

  deletePaymentType(id: number): Observable<boolean> {
    return this.http.delete<boolean>(API_ENDPOINT + '/barcodes/' + id);
  }

  getTotalBarcodes(): Observable<number> {
    return this.http.get<number>(API_ENDPOINT + '/barcodes/count');
  }

  searchItem(code: string): Observable<Barcodes> {
    return this.http.get<Barcodes>(API_ENDPOINT + '/barcodes/' + code);
  }

  public findProductByCode(code: string): Observable<Barcodes[]> {
    if (!code) {
        return of([]);
  }
  // tslint:disable-next-line: align
  return this.http.get<Barcodes[]>(API_ENDPOINT + '/barcodes/product' + '/' + code);
}

  }
