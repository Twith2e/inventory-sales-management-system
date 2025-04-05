import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
  FaIconComponent,
  FaIconLibrary,
} from '@fortawesome/angular-fontawesome';
import { faAdd, faMinus } from '@fortawesome/free-solid-svg-icons';
import { AddItemComponent } from '../add-item/add-item.component';
import { TransactionsService } from '../../services/transactions.service';
import { IsPopulatedService } from '../../services/is-populated.service';

@Component({
  selector: 'app-new-transaction',
  imports: [
    FaIconComponent,
    ReactiveFormsModule,
    CommonModule,
    AddItemComponent,
  ],
  templateUrl: './new-transaction.component.html',
  styleUrl: './new-transaction.component.css',
})
export class NewTransactionComponent implements OnInit {
  isFocused = signal(false);
  isPopulatedService = inject(IsPopulatedService);
  cummulativePrice = signal<number>(0);
  changeDue = signal<number>(0);
  itemCode = signal<string>('');

  transactService = inject(TransactionsService);

  constructor(library: FaIconLibrary) {
    library.addIcons(faAdd, faMinus);
    if (this.isPopulatedService.isPopulated) {
      this.transactService.newTransaction.patchValue({
        itemCode: this.itemCode(),
      });
    }
  }

  addIcon = faAdd;
  minusIcon = faMinus;

  onSubmit() {
    this.transactService.onSubmit();
  }

  reset() {
    this.transactService.clearForm();
  }

  extend() {
    this.transactService.openForm();
  }

  extract() {
    this.transactService.closeForm();
  }

  focus() {
    this.isFocused.set(!this.isFocused());
  }

  retrieveItemCode(value: any) {
    this.itemCode.set(value.itemCode);
  }

  ngOnInit(): void {
    this.transactService.cummulativePrice$.subscribe((price) => {
      this.cummulativePrice.set(price);
      this.transactService.newTransaction.patchValue({
        totalPrice: this.cummulativePrice(),
      });
      this.updateBalance();
    });
  }

  updateBalance() {
    const price = (document.getElementById('amount-paid') as HTMLInputElement)
      .value;
    if (!price) return;
    if (+price >= this.cummulativePrice()) {
      this.transactService.newTransaction.patchValue({
        balance: +price - this.cummulativePrice(),
      });
    } else if (+price <= this.cummulativePrice()) {
      this.transactService.newTransaction.patchValue({
        balance: 0,
      });
    }
  }
}
