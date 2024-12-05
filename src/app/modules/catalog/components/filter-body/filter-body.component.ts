import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { CurrencyService } from '../../../../services/currency.service';
import { Category } from '../../model/Category';

@Component({
  selector: 'app-filter-body',
  templateUrl: './filter-body.component.html',
  styleUrls: ['./filter-body.component.scss']
})
export class FilterBodyComponent implements OnChanges, OnInit {

  @Output() getNextPage = new EventEmitter<number>();
  @Output() searchWithFilter = new EventEmitter<{min: number, max: number}>();
  selectedCategory: Category | undefined;
  @Input() categories!: Category[];
  allCategories: Category[] = [];
  dropdownOpen = false;

  minPrice: number = 20;
  maxPrice: number = 4000;

  constructor(private currencyService: CurrencyService) {}

  ngOnInit() {
    const allCategoriesOption: Category = {
      categoryId: 0,
      name: 'All Categories'
    };
    this.allCategories = [allCategoriesOption];
    this.selectedCategory = allCategoriesOption;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['categories'] && this.categories) {
      const allCategoriesOption: Category = {
        categoryId: 0,
        name: 'All Categories'
      };
      this.allCategories = [allCategoriesOption, ...this.categories];
    }
  }

  convertPrice(priceInEuros: number): string {
    return this.currencyService.formatPriceInSelectedCurrency(priceInEuros);
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  searchWithPrice() {
    this.searchWithFilter.emit({ min: this.minPrice, max: this.maxPrice })
  }

  selectCategory(category: Category) {
    this.selectedCategory = category;
    this.dropdownOpen = false;
    this.getNextPage.emit(category.categoryId);
  }
}