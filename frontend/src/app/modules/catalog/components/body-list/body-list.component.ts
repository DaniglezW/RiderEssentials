import { ChangeDetectorRef, Component, EventEmitter, Injectable, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Product } from '../../../../model/product';
import { PageProductResponse } from '../../model/PageProductResponse';
import { CurrencyService } from '../../../../services/currency.service';

@Injectable({
  providedIn: 'root'
})
export class PageStateService {
  page: number = 0;
  rows: number = 12;
}

interface PageEvent {
  first: number;
  rows: number;
  page: number;
  pageCount: number;
}

@Component({
  selector: 'app-body-list',
  templateUrl: './body-list.component.html',
  styleUrls: ['./body-list.component.scss']
})
export class BodyListComponent implements OnChanges, OnInit {

  @Output() getNextPage = new EventEmitter<PageStateService>();
  @Input() pageProducts!: PageProductResponse;
  products!: Product[];
  rows!: number;
  first!: number;
  page!: number;

  constructor(private cdr: ChangeDetectorRef, private pageStateService: PageStateService, private currencyService: CurrencyService) { }

  ngOnInit(): void {
    this.page = this.pageStateService.page;
    this.rows = this.pageStateService.rows;
    this.first = this.page * this.rows;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['pageProducts'] && this.pageProducts) {
      this.products = this.pageProducts.content;
      this.products.forEach(product => {
        if (product.image) {
          product.image = `data:image/jpeg;base64,${product.image}`;
        }
      });
    }
  }

  convertDataToImage(data: number[], product: Product) {
    const byteArray = new Uint8Array(data);
    const blob = new Blob([byteArray], { type: 'image/png' });
    const reader = new FileReader();

    reader.onload = (event: any) => {
      product.imageUrl = event.target.result;
      this.cdr.markForCheck();
    };

    reader.readAsDataURL(blob);
  }

  onPageChange(event: PageEvent) {
    this.first = event.first;
    this.rows = event.rows;
    this.page = event.page;
    this.pageStateService.page = this.page;
    this.pageStateService.rows = this.rows;
    this.getNextPage.emit(this.pageStateService);
  }

  convertPrice(priceInEuros: number): string {
    return this.currencyService.formatPriceInSelectedCurrency(priceInEuros);
  }
}