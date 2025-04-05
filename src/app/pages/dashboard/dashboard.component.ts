import { Component, inject, OnInit, signal } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { WelcomeBannerComponent } from '../../components/welcome-banner/welcome-banner.component';
import { DashboardCardComponent } from '../../components/dashboard-card/dashboard-card.component';
import { ResuableCardComponent } from '../../components/resuable-card/resuable-card.component';
import {
  FaIconLibrary,
  FontAwesomeModule,
} from '@fortawesome/angular-fontawesome';
import { ReusableTableComponent } from '../../components/reusable-table/reusable-table.component';
import { SalesService } from '../../services/sales.service';
import { catchError } from 'rxjs';
import { SalesResponse } from '../../../models/SalesResponse.type';
import { ChartComponent } from '../../components/chart/chart.component';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [
    WelcomeBannerComponent,
    DashboardCardComponent,
    ResuableCardComponent,
    FontAwesomeModule,
    ReusableTableComponent,
    ChartComponent,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  headerArray = [
    {
      header: 'Product',
      field: 'itemName',
    },
    {
      header: 'Price',
      field: 'itemPrice',
    },
    {
      header: 'Sales',
      field: 'sales',
    },
  ];

  headerArray2 = [
    {
      header: 'Product',
      field: 'itemName',
    },
    {
      header: 'Payment',
      field: 'paymentMode',
    },
    {
      header: 'Amount',
      field: 'totalPrice',
    },
  ];
  salesService = inject(SalesService);
  data = signal<any>([]);
  data2 = signal<any>([]);

  ngOnInit() {
    this.salesService
      .handleFetch()
      .pipe(
        catchError((err) => {
          console.error(err);
          throw err;
        })
      )
      .subscribe({
        next: (response: SalesResponse) => {
          console.log(response);
          const arrangedData = Object.values(
            response.sales.reduce((acc, sale) => {
              const productId = sale.product._id;

              if (!acc[productId]) {
                acc[productId] = {
                  itemName: sale.product.itemName,
                  itemPrice: sale.product.itemPrice,
                  sales: 0,
                };
              }

              acc[productId].sales += Number(sale.quantity);

              return acc;
            }, {} as Record<string, { itemName: string; itemPrice: string; sales: number }>)
          );

          const arrangedData2 = Object.values(
            response.sales.reduce((acc, sale) => {
              acc[sale._id] = {
                itemName: sale.product.itemName,
                totalPrice: sale.totalPrice,
                paymentMode: sale.paymentMode,
              };

              return acc;
            }, {} as Record<any, any>)
          );

          this.data2.set(arrangedData2);
          const sortedData = arrangedData.sort((a, b) => a.sales + b.sales);
          this.data.set(sortedData);
          console.log(this.data2());
          console.log(this.data());
        },
        error: (error) => {
          console.error(error);
        },
      });
  }

  myAction = signal(true);

  constructor(library: FaIconLibrary) {
    library.addIcons();
  }
}
