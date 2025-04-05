import { Component, EventEmitter, inject, Output, signal } from '@angular/core';
import { CustomSelectComponent } from '../custom-select/custom-select.component';
import { TransactionsService } from '../../services/transactions.service';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-item',
  imports: [CustomSelectComponent, ReactiveFormsModule],
  templateUrl: './add-item.component.html',
  styleUrl: './add-item.component.css',
})
export class AddItemComponent {
  transactService = inject(TransactionsService);
  inputFields = {
    availableQty: 0,
    unitPrice: 0,
    itemCode: '',
  };

  @Output() inputData = new EventEmitter<{
    itemCode: string;
  }>();

  qtyPicked = signal(0);
  totalPrice = signal(0);

  updateQty(e: Event) {
    const currentQty = (e.target as HTMLInputElement).value;
    this.qtyPicked.set(+currentQty);
    this.transactService.newTransaction.patchValue({
      totalPrice: +currentQty,
    });
  }

  retrieveData(value: any) {
    this.qtyPicked.set(1);
    this.transactService.newTransaction.patchValue({
      quantity: 1,
    });
    this.inputData.emit({
      itemCode: value.itemCode,
    });
    this.inputFields = value;
    this.transactService.newTransaction.patchValue({
      availableQty: this.inputFields.availableQty,
    });
    this.transactService.newTransaction.patchValue({
      unitPrice: this.inputFields.unitPrice,
    });
    this.updateCumulativePrice(this.inputFields.unitPrice);
    this.transactService.newTransaction.patchValue({
      tPrice: this.inputFields.unitPrice * this.qtyPicked(),
    });
    this.totalPrice.set(this.inputFields.unitPrice * this.qtyPicked());
  }

  updateTotalPrice() {
    const currentQty = this.qtyPicked();
    const newTotal = this.inputFields.unitPrice * currentQty;
    this.transactService.newTransaction.patchValue({
      tPrice: newTotal,
    });
    this.totalPrice.set(newTotal);
    this.updateCumulativePrice(newTotal);
  }

  updateCumulativePrice(value: number) {
    this.transactService.updateCumulativePrice(value);
  }
}
