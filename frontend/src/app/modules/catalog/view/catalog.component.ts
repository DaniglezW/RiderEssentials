import { Component, HostListener, OnInit, Output } from '@angular/core';
import { CatalogService } from '../services/catalog.service';
import { PageProductResponse } from '../model/PageProductResponse';
import { Category } from '../model/Category';
import { Product } from '../../../model/product';
import { ProductSearchService } from '../../../services/productSearchService.service';
import { ProductService } from '../../product/services/productService.service';

export class PageStateService {
  page: number = 0;
  rows: number = 12;
}

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit {

  @Output() products!: PageProductResponse;
  @Output() productsByCategory!: Product[];
  @Output() categories!: Category[];
  categoryCatalog: boolean = false;
  isDesktopView: boolean = false;
  noPageable: boolean = false;
  loading: boolean = false;
  totalElements: number = 0;
  currentPage: number = 0;
  totalPages: number = 0;
  max: number = 5000;
  min: number = 0;
  constructor(private catalogService: CatalogService, private productSearchService: ProductSearchService, private productService: ProductService){};

  ngOnInit() {
    this.productSearchService.currentProducts.subscribe((response: PageProductResponse | null) => {
      if (response) {
        this.products = response
      }
    });
    this.catalogService.getCategories()
    .subscribe({
      next: (response) => {
        const res: Category[] = response;
        if (res.length > 0) {
          this.categories = res
        }
      }
    });
    this.getNextPage(new PageStateService);
    this.checkScreenSize();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.checkScreenSize();
  }

  getNextPage(page: PageStateService) {
    this.noPageable = false;
    this.loading = true;
    this.catalogService.getProducts(page)
      .subscribe({
        next: (response) => {
          const res: PageProductResponse = response;
          if (res.content && res.content.length > 0) {
            this.products = res
          }
          this.loading = false;
        }
      });
  }

  getProductsByCategory(categoryId: number) {
    this.noPageable = false;
    if (categoryId && categoryId != 0) {
      this.categoryCatalog = true;
      this.loading = true;
      this.catalogService.getProductsByCategory(categoryId)
        .subscribe({
          next: (response) => {
            const res: Product[] = response;
            if (res && res.length > 0) {
              this.productsByCategory = res
              this.categoryCatalog = true;
            }
            this.loading = false;
          }
        });
    } else {
      this.categoryCatalog = false;
      this.getNextPage(new PageStateService);
    }
  }

  getProductsByFilter(filter: { min: number, max: number }) {
    if (filter.min && filter.max) {
      this.noPageable = true;
      this.loading = true;
      this.productService.getProductsByFilter(filter.min, filter.max)
        .subscribe({
          next: (response) => {
            const res: Product[] = response;
            if (res && res.length > 0) {
              this.products.content = res
            } else if (res) {
              this.products.content = []
            }
            this.min = filter.min;
            this.max = filter.max;
            this.loading = false;
          }
        });
    } else {
      this.loading = false;
      this.noPageable = false;
      this.getNextPage(new PageStateService);
    }
  }

  private checkScreenSize() {
    this.isDesktopView = window.innerWidth > 768;
  }

}
