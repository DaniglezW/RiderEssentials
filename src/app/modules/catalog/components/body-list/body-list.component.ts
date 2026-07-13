import { ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Product } from '../../../../model/product';
import { PageProductResponse } from '../../model/PageProductResponse';
import { CurrencyService } from '../../../../services/currency.service';
import { PageStateService } from '@/app/core/services/page-state.service';
import { ProductEnrichmentService, ProductMeta } from '@/app/services/product-enrichment.service';
import { WishlistService } from '@/app/services/wishlist.service';
import { CartService } from '@/app/services/CartService.service';

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
export class BodyListComponent implements OnChanges {
  @Output() getNextPage = new EventEmitter<PageStateService>();
  @Input() pageProducts!: PageProductResponse;
  @Input() noPageable = false;
  @Input() max = 5000;
  @Input() min = 0;
  @Input() sortBy = 'default';

  products: Product[] = [];
  rows!: number;
  first!: number;
  page!: number;
  localSort = 'default';

  constructor(
    private cdr: ChangeDetectorRef,
    private pageStateService: PageStateService,
    private currencyService: CurrencyService,
    public enrichment: ProductEnrichmentService,
    private wishlistService: WishlistService,
    private cartService: CartService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['pageProducts'] && this.pageProducts) {
      this.page = this.pageStateService.page;
      this.rows = this.pageStateService.rows;
      this.first = this.page * this.rows;
      this.products = this.pageProducts.content
        .filter((p) => p.productId !== 9999)
        .map((p) => this.prepareProduct(p));
      this.applySort();
    }
    if (changes['sortBy']) {
      this.localSort = this.sortBy;
      this.applySort();
    }
  }

  private prepareProduct(product: Product): Product {
    if (product.image && !product.image.startsWith('data:')) {
      product.image = `data:image/jpeg;base64,${product.image}`;
    }
    return product;
  }

  applySort(): void {
    const sort = this.localSort;
    if (sort === 'price-asc') this.products.sort((a, b) => a.price - b.price);
    else if (sort === 'price-desc') this.products.sort((a, b) => b.price - a.price);
    else if (sort === 'name') this.products.sort((a, b) => a.name.localeCompare(b.name));
  }

  onSortChange(): void {
    this.applySort();
  }

  getMeta(product: Product): ProductMeta {
    return this.enrichment.getMeta(product);
  }

  isWishlisted(productId: number): boolean {
    return this.wishlistService.isInWishlist(productId);
  }

  toggleWishlist(event: Event, product: Product): void {
    event.stopPropagation();
    event.preventDefault();
    this.wishlistService.toggle(product);
  }

  quickAdd(event: Event, product: Product): void {
    event.stopPropagation();
    event.preventDefault();
    const meta = this.getMeta(product);
    this.cartService.addToCart({
      productId: product.productId,
      name: product.name,
      image: product.image,
      price: product.price,
      quantity: 1,
      size: 'X',
      brand: meta.brand,
    });
  }

  onPageChange(event: PageEvent): void {
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
