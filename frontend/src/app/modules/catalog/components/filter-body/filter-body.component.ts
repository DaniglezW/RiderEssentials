import { Component, Input } from '@angular/core';
import { CurrencyService } from '../../../../services/currency.service';
import { Category } from '../../model/Category';

@Component({
  selector: 'app-filter-body',
  templateUrl: './filter-body.component.html',
  styleUrls: ['./filter-body.component.scss']
})
export class FilterBodyComponent {

  selectedCategory: Category | undefined;
  @Input() categories!: Category[];
  minPrice: number = 20;
  maxPrice: number = 4000;

  constructor(private currencyService: CurrencyService) {}

  convertPrice(priceInEuros: number): string {
    return this.currencyService.formatPriceInSelectedCurrency(priceInEuros);
  }
}