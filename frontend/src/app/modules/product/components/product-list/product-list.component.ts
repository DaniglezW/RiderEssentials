import { ChangeDetectorRef, Component, Input, SimpleChanges } from '@angular/core';
import { Product } from '../../../../model/product';
import { CurrencyService } from '../../../../services/currency.service';

@Component({
  selector: 'app-product-list-component',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent {
  @Input() products!: Product[];

  constructor(private cdr: ChangeDetectorRef, private currencyService: CurrencyService) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['products'] && this.products) {
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

  convertPrice(priceInEuros: number): string {
    return this.currencyService.formatPriceInSelectedCurrency(priceInEuros);
  }
}