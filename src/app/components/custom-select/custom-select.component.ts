import { CommonModule } from '@angular/common';
import {
  Component,
  computed,
  effect,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
  signal,
} from '@angular/core';
import {
  FaIconComponent,
  FaIconLibrary,
} from '@fortawesome/angular-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { FetchProductsService } from '../../services/fetch-products.service';
import { catchError } from 'rxjs';
import { ProductsResponse } from '../../../models/ProductsResponse.type';
import { TransactionsService } from '../../services/transactions.service';
import { IsPopulatedService } from '../../services/is-populated.service';

@Component({
  selector: 'app-custom-select',
  imports: [FaIconComponent, CommonModule],
  templateUrl: './custom-select.component.html',
  styleUrl: './custom-select.component.css',
})
export class CustomSelectComponent implements OnInit {
  @Output() inputData = new EventEmitter<{
    availableQty: string | number;
    unitPrice: string | number;
    itemCode: string | number;
  }>();

  transactService = inject(TransactionsService);
  productsService = inject(FetchProductsService);
  isPopulatedService = inject(IsPopulatedService);
  isExtended = signal(false);
  reqResponse = signal<ProductsResponse['products']>([]);
  searchTerm = signal('');
  filteredItems = computed(() => {
    return this.transactService
      .items()
      .filter((item) =>
        item.toLowerCase().includes(this.searchTerm().toLowerCase())
      );
  });

  constructor(public library: FaIconLibrary) {
    library.addIcons(faChevronDown, faChevronUp);
  }

  upIcon = faChevronUp;
  downIcon = faChevronDown;

  extend() {
    this.isExtended.set(!this.isExtended());
    this.transactService.items.set([]);
    this.fetchProducts();
  }

  fetchProducts() {
    this.productsService
      .fetchProducts()
      .pipe(
        catchError((err) => {
          console.log(err);
          throw err;
        })
      )
      .subscribe({
        next: (response) => {
          console.log('products', response);
          this.reqResponse.set(response.products);
          const extractedItems = response.products.map((item) => {
            return item.itemName;
          });

          this.transactService.items.set(extractedItems);
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  filterProducts(event: Event) {
    const term = (event.target as HTMLInputElement).value.toLowerCase();
    this.searchTerm.set(term);
  }

  pickItem(event: Event) {
    const selectedItem = (event.target as HTMLElement).textContent;
    if (selectedItem) {
      this.transactService.text.set(selectedItem);
      console.log(this.populateFields(selectedItem));
      this.isPopulatedService.isPopulated = true;
    } else this.transactService.text.set('Select Item');
    this.isExtended.set(false);
  }

  populateFields(item: string) {
    const itemDets = this.reqResponse().find(
      (res) => res.itemName === item.trim()
    );

    const data = {
      availableQty: itemDets?.itemQty || 0,
      unitPrice: itemDets?.itemPrice || 0,
      itemCode: itemDets?.itemCode || '',
    };

    this.inputData.emit(data);
    return data;
  }

  ngOnInit(): void {
    this.fetchProducts();
  }
}
