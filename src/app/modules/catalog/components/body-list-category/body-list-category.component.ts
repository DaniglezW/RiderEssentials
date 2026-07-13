import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Product } from '../../../../model/product';
import { CurrencyService } from '../../../../services/currency.service';
import { ProductEnrichmentService } from '@/app/services/product-enrichment.service';
import { WishlistService } from '@/app/services/wishlist.service';
import { CartService } from '@/app/services/CartService.service';

@Component({
  selector: 'app-body-list-category',
  templateUrl: './body-list-category.component.html',
  styleUrls: ['./body-list-category.component.scss']
})
export class BodyListComponentCategory implements OnChanges {
  @Input() products!: Product[];
  @Input() sortBy = 'default';

  constructor(
    private currencyService: CurrencyService,
    public enrichment: ProductEnrichmentService,
    private wishlistService: WishlistService,
    private cartService: CartService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['products'] && this.products) {
      this.products = this.products
        .filter((p) => p.productId !== 9999)
        .map((p) => {
          if (p.image && !p.image.startsWith('data:')) {
            p.image = `data:image/jpeg;base64,${p.image}`;
          }
          return p;
        });
    }
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

  convertPrice(priceInEuros: number): string {
    return this.currencyService.formatPriceInSelectedCurrency(priceInEuros);
  }
}
