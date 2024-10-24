import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ProductService } from '../product/services/productService.service';
import { ProductSearchService } from '../../services/productSearchService.service';
import { PageProductResponse } from '../catalog/model/PageProductResponse';
import { CatalogService } from '../catalog/services/catalog.service';
import { CurrencyService } from '@/app/services/currency.service';
import { CartService } from '@/app/services/CartService.service';

export class PageStateService {
  page: number = 0;
  rows: number = 12;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  languages = [
    { code: 'es', name: 'Español' },
    { code: 'ca', name: 'Català' },
    { code: 'en', name: 'English' },
    { code: 'pt', name: 'Português' }
  ];

  searchTerm: string = '';
  selectedLanguage: any;
  dropdownOpen = false;
  cartItems: any[] = [];
  totalPrice: number = 0;

  constructor(private translate: TranslateService, 
    private productService: ProductService, 
    private productSearchService: ProductSearchService,
    private catalogService: CatalogService,
    private currencyService: CurrencyService,
    private cartService: CartService
  ) { }

  ngOnInit() {
    this.cartService.loadCart();
    this.cartService.getCartItems().subscribe((items) => {
      this.cartItems = items;
      this.calculateTotalPrice();
    });
    const defaultLang = localStorage.getItem('selectedLanguage') || 'es';
    this.translate.setDefaultLang(defaultLang);
    this.translate.use(defaultLang);
    this.selectedLanguage = this.languages.find(lang => lang.code === defaultLang) || this.languages[0];
  }

  onSearch(term: string) {
    this.searchTerm = term;

    if (term.trim().length === 0) {
      this.catalogService.getProducts(new PageStateService).subscribe((response: PageProductResponse) => {
        this.productSearchService.changeProducts(response);
      });
    } else {
      this.productService.searchProducts(term).subscribe((response: PageProductResponse) => {
        this.productSearchService.changeProducts(response);
      });
    }
  }

  changeLanguage(language: any) {
    this.translate.use(language.code);
    localStorage.setItem('selectedLanguage', language.code);
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  selectLanguage(language: any) {
    this.selectedLanguage = language;
    this.translate.use(language.code);
    localStorage.setItem('selectedLanguage', language.code);
    this.dropdownOpen = false;
  }

  loadCart() {
    const cart = localStorage.getItem('cart');
    if (cart) {
      this.cartItems = JSON.parse(cart);
      this.calculateTotalPrice();
    }
  }

  calculateTotalPrice() {
    this.totalPrice = this.cartItems.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);
  }

  proceedToCheckout() {
    console.log('Pagando...');
  }

  cleanShoppingCart() {
    this.cartService.clearCart();
  }

  convertPrice(priceInEuros: number): string {
    return this.currencyService.formatPriceInSelectedCurrency(priceInEuros);
  }
}