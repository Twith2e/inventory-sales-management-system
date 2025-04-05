import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { SalesBody } from '../../models/SalesBody.type';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  http = inject(HttpClient);

  url = 'http://localhost:3000/api/sales/add';

  addSales(body: SalesBody) {
    return this.http.post<{ message: string; success: boolean }>(
      this.url,
      body
    );
  }

  constructor() {}
}
