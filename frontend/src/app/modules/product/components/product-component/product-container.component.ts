import { ChangeDetectorRef, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Product } from '../../../../model/product';
import { CurrencyService } from '../../../../services/currency.service';
import { CartService } from '@/app/services/CartService.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-product-container',
  templateUrl: './product-container.component.html',
  styleUrls: ['./product-container.component.scss'],
  providers: [MessageService]
})
export class ProductContainerComponent implements OnChanges{
  @Input() product!: Product;

  constructor(private cdr: ChangeDetectorRef, private currencyService: CurrencyService, private cartService: CartService, private messageService: MessageService) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['product'] && this.product) {
        if (this.product.image) {
          this.product.image = `data:image/jpeg;base64,${this.product.image}`;
        }
    }
  }

  convertPrice(priceInEuros: number): string {
    return this.currencyService.formatPriceInSelectedCurrency(priceInEuros);
  }

  addToCart() {
    const quantityInput = document.querySelector('.quantity input') as HTMLInputElement;
    const sizeSelect = document.querySelector('#size') as HTMLSelectElement;

    const quantity = parseInt(quantityInput.value, 10) || 1;
    const selectedSize = sizeSelect ? sizeSelect.value : '';

    const cartItem = {
      productId: this.product.productId,
      name: this.product.name,
      image: this.product.image,
      price: this.product.price,
      quantity: quantity,
      size: selectedSize || 'X',
    };

    this.cartService.addToCart(cartItem);
    this.showSuccess(cartItem.name);
  }

  showSuccess(productName: string) {
    this.messageService.add({ severity: 'success', summary: 'Producto añadido', detail: `${productName} se ha añadido al carrito.` });
  }
}