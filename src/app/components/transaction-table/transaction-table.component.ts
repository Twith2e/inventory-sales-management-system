import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { SalesService } from '../../services/sales.service';
import { catchError } from 'rxjs';
import { CommonModule } from '@angular/common';
import { currencyFormatter } from '../../utils/formatCurrency';
import {
  FaIconComponent,
  FaIconLibrary,
} from '@fortawesome/angular-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

type TableData = {
  'Total Items': string;
  'Total Amount': string;
  'Amount Tendered': string;
  'Change Due': string;
  'Mode of Payment': string;
  Customer: string;
};

@Component({
  selector: 'app-transaction-table',
  imports: [MatTableModule, CommonModule, MatPaginatorModule, FaIconComponent],
  templateUrl: './transaction-table.component.html',
  styleUrls: ['./transaction-table.component.css', '../../../styles.scss'],
})
export class TransactionTableComponent implements OnInit {
  dataSource = new MatTableDataSource<TableData>([]);
  displayedColumns: string[] = [
    'Total Items',
    'Total Amount',
    'Amount Tendered',
    'Change Due',
    'Mode of Payment',
    'Customer',
  ];
  salesService = inject(SalesService);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  fetchSales() {
    this.salesService
      .handleFetch()
      .pipe(
        catchError((err) => {
          console.error(err);
          throw err;
        })
      )
      .subscribe({
        next: (response) => {
          const tableData: TableData[] = response.sales.map((sale) => ({
            'Total Items': sale.quantity.toString(),
            'Total Amount': currencyFormatter(Number(sale.totalPrice)),
            'Amount Tendered': currencyFormatter(Number(sale.amountPaid)),
            'Change Due': currencyFormatter(Number(sale.balance)),
            'Mode of Payment': sale.paymentMode,
            Customer: sale.customer || '-- --',
          }));

          this.dataSource.data = tableData;

          console.log(this.dataSource.data);
        },
        error: (error) => {
          console.error(error);
        },
      });
  }

  ngOnInit(): void {
    this.fetchSales();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  get completeColumns() {
    return ['sn', ...this.displayedColumns, 'status'];
  }

  constructor(private library: FaIconLibrary) {
    library.addIcons(faSearch);
  }

  searchIcon = faSearch;
}
