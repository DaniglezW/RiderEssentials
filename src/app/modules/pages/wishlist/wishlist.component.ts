import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WishlistService } from '@/app/services/wishlist.service';
import { CartService } from '@/app/services/CartService.service';
import { CurrencyService } from '@/app/services/currency.service';
import { ProductEnrichmentService } from '@/app/services/product-enrichment.service';
import { Product } from '@/app/model/product';

@Component({
  selector: 'app-wishlist-page',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss'],
})
export class WishlistPageComponent implements OnInit {
  items: Product[] = [];

  constructor(
    private wishlistService: WishlistService,
    private cartService: CartService,
    private currencyService: CurrencyService,
    public enrichment: ProductEnrichmentService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.wishlistService.getItems().subscribe((items) => {
      this.items = items.map((p) => this.prepareImage(p));
    });
  }

  private prepareImage(product: Product): Product {
    if (product.image && !product.image.startsWith('data:')) {
      product.image = `data:image/jpeg;base64,${product.image}`;
    }
    return product;
  }

  formatPrice(price: number): string {
    return this.currencyService.formatPriceInSelectedCurrency(price);
  }

  remove(productId: number): void {
    this.wishlistService.remove(productId);
  }

  addToCart(product: Product): void {
    const meta = this.enrichment.getMeta(product);
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

  goToProduct(product: Product): void {
    this.router.navigate(['/product', product.productId]);
  }
}
