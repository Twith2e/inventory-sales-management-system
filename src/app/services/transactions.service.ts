import { inject, Injectable, signal } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BehaviorSubject, catchError } from 'rxjs';
import { OrderService } from './order.service';
import { FetchProductsService } from './fetch-products.service';

@Injectable({
  providedIn: 'root',
})
export class TransactionsService {
  private cummulativePriceSubject = new BehaviorSubject<number>(0);
  isExtended = signal(false);
  orderService = inject(OrderService);
  productsService = inject(FetchProductsService);
  cummulativePrice$ = this.cummulativePriceSubject.asObservable();
  items = signal<Array<string>>([]);
  text = signal('Select Item');

  newTransaction: FormGroup;

  constructor(private fb: FormBuilder) {
    this.newTransaction = this.fb.group({
      paymentMode: [''],
      availableQty: [''],
      unitPrice: [''],
      itemCode: [''],
      tPrice: [''],
      totalPrice: [''],
      amountPaid: [''],
      balance: [''],
      quantity: [''],
    });
  }

  onSubmit() {
    if (this.newTransaction.valid) {
      console.log(this.newTransaction.value);

      this.orderService
        .addSales(this.newTransaction.value)
        .pipe(
          catchError((err) => {
            console.log(err);
            throw err;
          })
        )
        .subscribe({
          next: (response) => {
            console.log(response);
            this.isExtended.set(false);
            this.clearForm();
          },
          error: (error) => {
            console.log(error);
          },
        });
    } else {
      console.log(false);
    }
  }

  clearForm() {
    this.newTransaction.reset({
      paymentMode: '',
      availableQty: '',
      unitPrice: '',
      itemCode: '',
      tPrice: '',
      totalPrice: '',
      amountPaid: '',
      balance: '',
      quantity: '',
    });

    this.text.set('Select Item');
  }

  closeForm() {
    this.isExtended.set(false);
  }

  openForm() {
    this.isExtended.set(!this.isExtended());
    console.log(this.isExtended());
  }

  updateCumulativePrice(value: number) {
    this.cummulativePriceSubject.next(value);
  }
}
