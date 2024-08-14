import { Component, HostListener, OnChanges, OnInit, Input, SimpleChanges, Output } from '@angular/core';
import { Product } from '../../../model/product';
import { ProductService } from '../services/productService.service';
import { ActivatedRoute } from '@angular/router';
import { CatalogService } from '../../catalog/services/catalog.service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit, OnChanges {

  @Output() product!: Product;
  @Output() productList!: Product[];
  isDesktopView: boolean = false;
  loading: boolean = false;
  loadingList: boolean = false;

  constructor(private route: ActivatedRoute, private productService: ProductService, private catalogService: CatalogService){}
  
  ngOnChanges(changes: SimpleChanges): void {
    if (changes[""]) {
      
    }
  }

  ngOnInit() {
    this.loadingList = true;
    this.loading = true;

    this.route.paramMap.pipe(switchMap(params => {
          const productId = +params.get('productId')!;
          this.loading = true;
          return this.productService.getProductById(productId);
        })
      ).subscribe({
        next: (response) => {
          if (response) {
            this.product = response;
            this.loading = false;
            this.getProductsByCategory(this.product.category.categoryId);
          }
        },
        error: (err) => {
          console.error('Error fetching product:', err);
          this.loading = false;
        }
      });

    this.checkScreenSize();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.checkScreenSize();
  }

  private checkScreenSize() {
    this.isDesktopView = window.innerWidth > 768;
  }

  getProductsByCategory(categoryId: number) {
    this.catalogService.getProductsByCategory(categoryId)
      .subscribe({
        next: (response) => {
          const res: Product[] = response;
          if (res && res.length > 0) {
            this.productList = res;
            this.loadingList = false;
          } else {
            this.loadingList = false;
          }
        },
        error: (err) => {
          this.loadingList = false;
        }
      });
  }
  
}