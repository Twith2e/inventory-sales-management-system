import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductsResponse } from '../../models/ProductsResponse.type';

@Injectable({
  providedIn: 'root',
})
export class FetchProductsService {
  constructor(private http: HttpClient) {}
  private url = 'http://localhost:3000/api/products/fetch';
  fetchProducts() {
    return this.http.get<ProductsResponse>(this.url);
  }
}
