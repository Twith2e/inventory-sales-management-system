import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SalesResponse } from '../../models/SalesResponse.type';
import { SalesArray } from '../../models/Sales.type';

@Injectable({
  providedIn: 'root',
})
export class SalesService {
  constructor(private http: HttpClient) {}
  private url = 'http://localhost:3000/api/sales/fetch';
  handleFetch() {
    return this.http.get<SalesResponse>(this.url);
  }
}
