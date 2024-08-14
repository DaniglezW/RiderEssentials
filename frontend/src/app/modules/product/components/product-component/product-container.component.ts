import { ChangeDetectorRef, Component, Input, SimpleChanges } from '@angular/core';
import { Product } from '../../../../model/product';
import { CurrencyService } from '../../../../services/currency.service';

@Component({
  selector: 'app-product-container',
  templateUrl: './product-container.component.html',
  styleUrls: ['./product-container.component.scss']
})
export class ProductContainerComponent {
  @Input() product!: Product;

  constructor(private cdr: ChangeDetectorRef, private currencyService: CurrencyService) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['product'] && this.product) {
        if (this.product.image) {
          this.product.image = `data:image/jpeg;base64,${this.product.image}`;
        }
    }
  }

  convertPrice(priceInEuros: number): string {
    return this.currencyService.formatPriceInSelectedCurrency(priceInEuros);
  }
}