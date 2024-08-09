import { Component, HostListener, OnInit, Output } from '@angular/core';
import { CatalogService } from '../services/catalog.service';
import { Product } from '../model/product';
import { Category } from '../model/Category';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit {

  @Output() products!: Product[];
  @Output() categories!: Category[];
  isDesktopView: boolean = false;
  constructor(private catalogService: CatalogService){};

  ngOnInit() {
    this.catalogService.getProducts()
      .subscribe({
        next: (response) => {
          const res: Product[] = response;
          if (res.length > 0) {
            this.products = res
          }
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
    this.checkScreenSize();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.checkScreenSize();
  }

  private checkScreenSize() {
    this.isDesktopView = window.innerWidth > 768;
  }
}
