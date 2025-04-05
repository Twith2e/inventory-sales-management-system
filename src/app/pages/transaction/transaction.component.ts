import { Component } from '@angular/core';
import { TransactionTableComponent } from '../../components/transaction-table/transaction-table.component';
import { NewTransactionComponent } from '../../components/new-transaction/new-transaction.component';

@Component({
  selector: 'app-transaction',
  imports: [TransactionTableComponent, NewTransactionComponent],
  templateUrl: './transaction.component.html',
  styleUrl: './transaction.component.css',
})
export class TransactionComponent {}
