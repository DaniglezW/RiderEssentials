import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Product } from '../../../../model/product';
import { CurrencyService } from '../../../../services/currency.service';
import { CartService } from '@/app/services/CartService.service';
import { WishlistService } from '@/app/services/wishlist.service';
import { ProductEnrichmentService } from '@/app/services/product-enrichment.service';
import { GarageService } from '@/app/services/garage.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-product-container',
  templateUrl: './product-container.component.html',
  styleUrls: ['./product-container.component.scss'],
  providers: [MessageService],
})
export class ProductContainerComponent implements OnChanges {
  @Input() product!: Product;

  quantity = 1;
  selectedSize = '';
  sizeOptions: string[] = [];
  isWishlisted = false;
  primaryBike: string | null = null;

  constructor(
    private currencyService: CurrencyService,
    private cartService: CartService,
    private wishlistService: WishlistService,
    public enrichment: ProductEnrichmentService,
    private garageService: GarageService,
    private messageService: MessageService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['product'] && this.product) {
      if (this.product.image && !this.product.image.startsWith('data:')) {
        this.product.image = `data:image/jpeg;base64,${this.product.image}`;
      }
      this.sizeOptions = this.enrichment.getSizeOptions(this.product.category?.categoryId);
      this.isWishlisted = this.wishlistService.isInWishlist(this.product.productId);
      this.quantity = 1;
      this.selectedSize = '';
    }
    this.garageService.getBikes().subscribe((bikes) => {
      const primary = bikes[0];
      this.primaryBike = primary ? `${primary.make} ${primary.model} ${primary.year}` : null;
    });
  }

  get meta() {
    return this.enrichment.getMeta(this.product);
  }

  isCompatible(): boolean {
    if (!this.primaryBike) return true;
    const bikeMake = this.primaryBike.split(' ')[0];
    return this.meta.compatibleMakes.includes(bikeMake);
  }

  convertPrice(priceInEuros: number): string {
    return this.currencyService.formatPriceInSelectedCurrency(priceInEuros);
  }

  addToCart(): void {
    if (!this.meta.inStock) return;
    if (this.sizeOptions.length > 0 && !this.selectedSize) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Talla',
        detail: 'Selecciona una opción',
        life: 3000,
      });
      return;
    }
    this.cartService.addToCart({
      productId: this.product.productId,
      name: this.product.name,
      image: this.product.image,
      price: this.product.price,
      quantity: this.quantity,
      size: this.selectedSize || 'X',
      brand: this.meta.brand,
    });
    this.messageService.add({
      severity: 'success',
      summary: 'OK',
      detail: `${this.product.name}`,
      life: 3000,
    });
  }

  toggleWishlist(): void {
    this.isWishlisted = !this.isWishlisted;
    this.wishlistService.toggle(this.product);
  }

  incrementQty(): void { this.quantity++; }
  decrementQty(): void { if (this.quantity > 1) this.quantity--; }
}
