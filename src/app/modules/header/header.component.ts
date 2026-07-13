import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { filter, Subscription } from 'rxjs';
import { ProductService } from '../product/services/productService.service';
import { ProductSearchService } from '../../services/productSearchService.service';
import { PageProductResponse } from '../catalog/model/PageProductResponse';
import { CatalogService } from '../catalog/services/catalog.service';
import { CurrencyService } from '@/app/services/currency.service';
import { CartService } from '@/app/services/CartService.service';
import { WishlistService } from '@/app/services/wishlist.service';
import { PageStateService } from '@/app/core/services/page-state.service';
import { CartItem } from '@/app/model/cart-item';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  languages = [
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'ca', name: 'Català', flag: '🏴' },
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'pt', name: 'Português', flag: '🇵🇹' },
  ];

  searchTerm = '';
  selectedLanguage: any;
  dropdownOpen = false;
  cartItems: CartItem[] = [];
  totalPrice = 0;
  subtotal = 0;
  shippingCost = 0;
  cartCount = 0;
  wishlistCount = 0;
  private routerSubscription?: Subscription;

  constructor(
    private translate: TranslateService,
    private productService: ProductService,
    private productSearchService: ProductSearchService,
    private catalogService: CatalogService,
    private currencyService: CurrencyService,
    private cartService: CartService,
    private wishlistService: WishlistService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cartService.loadCart();
    this.cartService.getCartItems().subscribe((items) => {
      this.cartItems = items;
      this.cartCount = this.cartService.getItemCount();
      this.subtotal = this.cartService.getSubtotal();
      this.shippingCost = this.cartService.getShippingCost();
      this.totalPrice = this.cartService.getTotal();
    });

    this.wishlistService.getItems().subscribe((items) => {
      this.wishlistCount = items.length;
    });

    const defaultLang = localStorage.getItem('selectedLanguage') || 'es';
    this.translate.setDefaultLang(defaultLang);
    this.translate.use(defaultLang);
    this.selectedLanguage = this.languages.find((l) => l.code === defaultLang) || this.languages[0];

    this.routerSubscription = this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => this.restorePageScroll());
  }

  ngOnDestroy(): void {
    this.routerSubscription?.unsubscribe();
  }

  onSearch(term: string): void {
    const page = new PageStateService();
    if (term.trim().length === 0) {
      this.catalogService.getProducts(page).subscribe((response: PageProductResponse) => {
        this.productSearchService.changeProducts(response);
      });
    } else {
      this.productService.searchProducts(term).subscribe((response: PageProductResponse) => {
        this.productSearchService.changeProducts(response);
      });
    }
  }

  toggleDropdown(): void {
    this.dropdownOpen = !this.dropdownOpen;
  }

  selectLanguage(event: Event, language: any): void {
    event.preventDefault();
    this.selectedLanguage = language;
    this.translate.use(language.code);
    localStorage.setItem('selectedLanguage', language.code);
    this.dropdownOpen = false;
  }

  updateQty(item: CartItem, delta: number): void {
    this.cartService.updateQuantity(item.productId, item.size, item.quantity + delta);
  }

  removeItem(item: CartItem): void {
    this.cartService.removeItem(item.productId, item.size);
  }

  proceedToCheckout(): void {
    const offcanvasEl = document.getElementById('offcanvasDarkNavbar');
    const bootstrapApi = (window as Window & { bootstrap?: { Offcanvas: { getInstance: (el: Element) => { hide: () => void } | null } } }).bootstrap;

    if (offcanvasEl && bootstrapApi?.Offcanvas) {
      const instance = bootstrapApi.Offcanvas.getInstance(offcanvasEl);
      if (instance) {
        const navigate = () => this.router.navigate(['/checkout']);
        offcanvasEl.addEventListener('hidden.bs.offcanvas', () => {
          this.restorePageScroll();
          navigate();
        }, { once: true });
        instance.hide();
        return;
      }
    }

    this.restorePageScroll();
    this.router.navigate(['/checkout']);
  }

  private restorePageScroll(): void {
    document.body.classList.remove('overflow-hidden', 'modal-open');
    document.body.style.removeProperty('overflow');
    document.body.style.removeProperty('padding-right');
    document.documentElement.style.removeProperty('overflow');
    document.querySelectorAll('.offcanvas-backdrop').forEach((backdrop) => backdrop.remove());
  }

  cleanShoppingCart(): void {
    this.cartService.clearCart();
  }

  convertPrice(priceInEuros: number): string {
    return this.currencyService.formatPriceInSelectedCurrency(priceInEuros);
  }
}
