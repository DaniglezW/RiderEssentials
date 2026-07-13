import { Component, HostListener, OnInit } from '@angular/core';
import { CatalogService } from '../services/catalog.service';
import { PageProductResponse } from '../model/PageProductResponse';
import { Category } from '../model/Category';
import { Product } from '../../../model/product';
import { ProductSearchService } from '../../../services/productSearchService.service';
import { ProductService } from '../../product/services/productService.service';
import { PageStateService } from '@/app/core/services/page-state.service';
import { Subscription, timer } from 'rxjs';

type SortOption = 'default' | 'price-asc' | 'price-desc' | 'name';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit {
  private timerSubscription?: Subscription;

  products!: PageProductResponse;
  productsByCategory!: Product[];
  categories!: Category[];
  categoryCatalog = false;
  isDesktopView = false;
  noPageable = false;
  loading = false;
  showExtendedMessage = false;
  sortBy: SortOption = 'default';
  max = 5000;
  min = 0;

  constructor(
    private catalogService: CatalogService,
    private productSearchService: ProductSearchService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.productSearchService.currentProducts.subscribe((response) => {
      if (response) this.products = response;
    });
    this.catalogService.getCategories().subscribe({
      next: (response) => {
        if (response.length > 0) this.categories = response;
      }
    });
    this.getNextPage(new PageStateService());
    this.checkScreenSize();
  }

  @HostListener('window:resize')
  onResize(): void {
    this.checkScreenSize();
  }

  getNextPage(page: PageStateService): void {
    this.noPageable = false;
    this.loading = true;
    this.showExtendedMessage = false;
    this.timerSubscription = timer(10000).subscribe(() => {
      this.showExtendedMessage = true;
    });
    this.catalogService.getProducts(page).subscribe({
      next: (response) => {
        if (response.content?.length > 0) this.products = response;
        this.loading = false;
        this.clearTimer();
      },
      error: () => {
        this.loading = false;
        this.clearTimer();
      }
    });
  }

  private clearTimer(): void {
    this.timerSubscription?.unsubscribe();
    this.timerSubscription = undefined;
  }

  getProductsByCategory(categoryId: number): void {
    this.noPageable = false;
    if (categoryId && categoryId !== 0) {
      this.categoryCatalog = true;
      this.loading = true;
      this.catalogService.getProductsByCategory(categoryId).subscribe({
        next: (response) => {
          this.productsByCategory = response?.length > 0 ? response : [];
          this.categoryCatalog = true;
          this.loading = false;
        },
        error: () => { this.loading = false; }
      });
    } else {
      this.categoryCatalog = false;
      this.getNextPage(new PageStateService());
    }
  }

  getProductsByFilter(filter: { min: number; max: number }): void {
    if (filter.min && filter.max) {
      this.noPageable = true;
      this.loading = true;
      this.productService.getProductsByFilter(filter.min, filter.max).subscribe({
        next: (response) => {
          if (this.products) {
            this.products.content = response?.length > 0 ? response : [];
          }
          this.min = filter.min;
          this.max = filter.max;
          this.loading = false;
        },
        error: () => { this.loading = false; }
      });
    } else {
      this.noPageable = false;
      this.getNextPage(new PageStateService());
    }
  }

  onSortChange(): void {
    // sort is handled in body-list via Input
  }

  private checkScreenSize(): void {
    this.isDesktopView = window.innerWidth > 768;
  }
}
