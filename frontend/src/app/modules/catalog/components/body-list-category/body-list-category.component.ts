import { ChangeDetectorRef, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Product } from '../../../../model/product';
import { CurrencyService } from '../../../../services/currency.service';

@Component({
  selector: 'app-body-list-category',
  templateUrl: './body-list-category.component.html',
  styleUrls: ['./body-list-category.component.scss']
})
export class BodyListComponentCategory implements OnChanges {

  @Input() products!: Product[];

  constructor(private cdr: ChangeDetectorRef, private currencyService: CurrencyService) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['products'] && this.products) {
      this.products = this.products.filter(product => product.productId !== 9999);
      this.products.forEach(product => {
        if (product.image) {
          console.log(product);
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