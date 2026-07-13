import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { CartService } from '@/app/services/CartService.service';

import { OrderService } from '@/app/services/order.service';

import { CurrencyService } from '@/app/services/currency.service';

import { CartItem } from '@/app/model/cart-item';

import { Order, ShippingAddress } from '@/app/model/order';



@Component({

  selector: 'app-checkout',

  templateUrl: './checkout.component.html',

  styleUrls: ['./checkout.component.scss'],

})

export class CheckoutComponent implements OnInit {

  private static readonly PROMO_CODE = 'MOTO10';

  private static readonly PROMO_RATE = 0.1;

  private static readonly FREE_SHIPPING_THRESHOLD = 75;

  private static readonly SHIPPING_COST = 6.95;

  private static readonly COUPON_STORAGE_KEY = 'rider_coupon_applied';



  step = 1;

  cartItems: CartItem[] = [];

  subtotal = 0;

  shipping = 0;

  discount = 0;

  total = 0;

  orderComplete = false;

  completedOrder: Order | null = null;



  couponInput = '';

  couponApplied = false;

  couponError = '';



  address: ShippingAddress = {

    fullName: '',

    street: '',

    city: '',

    postalCode: '',

    country: 'España',

    phone: '',

  };



  paymentMethod = 'card';



  constructor(

    private cartService: CartService,

    private orderService: OrderService,

    private currencyService: CurrencyService,

    private router: Router

  ) {}



  ngOnInit(): void {

    this.couponApplied = sessionStorage.getItem(CheckoutComponent.COUPON_STORAGE_KEY) === 'true';

    if (this.couponApplied) {

      this.couponInput = CheckoutComponent.PROMO_CODE;

    }



    this.cartService.getCartItems().subscribe((items) => {

      this.cartItems = items;

      this.subtotal = this.cartService.getSubtotal();

      this.updateTotals();

      if (items.length === 0 && !this.orderComplete) {

        this.router.navigate(['/catalog']);

      }

    });

  }



  formatPrice(price: number): string {

    return this.currencyService.formatPriceInSelectedCurrency(price);

  }



  updateQty(item: CartItem, delta: number): void {

    this.cartService.updateQuantity(item.productId, item.size, item.quantity + delta);

  }



  removeItem(item: CartItem): void {

    this.cartService.removeItem(item.productId, item.size);

  }



  applyCoupon(): void {

    const code = this.couponInput.trim().toUpperCase();

    if (code === CheckoutComponent.PROMO_CODE) {

      this.couponApplied = true;

      this.couponError = '';

      sessionStorage.setItem(CheckoutComponent.COUPON_STORAGE_KEY, 'true');

    } else {

      this.couponApplied = false;

      this.couponError = 'CHECKOUT.COUPON_INVALID';

      sessionStorage.removeItem(CheckoutComponent.COUPON_STORAGE_KEY);

    }

    this.updateTotals();

  }



  removeCoupon(): void {

    this.couponApplied = false;

    this.couponInput = '';

    this.couponError = '';

    sessionStorage.removeItem(CheckoutComponent.COUPON_STORAGE_KEY);

    this.updateTotals();

  }



  onCouponKeydown(event: KeyboardEvent): void {

    if (event.key === 'Enter') {

      event.preventDefault();

      this.applyCoupon();

    }

  }



  private updateTotals(): void {

    this.discount = this.couponApplied

      ? Math.round(this.subtotal * CheckoutComponent.PROMO_RATE * 100) / 100

      : 0;

    const discountedSubtotal = this.subtotal - this.discount;

    this.shipping =

      this.subtotal === 0 || this.subtotal >= CheckoutComponent.FREE_SHIPPING_THRESHOLD

        ? 0

        : CheckoutComponent.SHIPPING_COST;

    this.total = Math.round((discountedSubtotal + this.shipping) * 100) / 100;

  }



  nextStep(): void {

    if (this.step < 3) this.step++;

    this.scrollToTop();

  }



  prevStep(): void {

    if (this.step > 1) this.step--;

    this.scrollToTop();

  }



  private scrollToTop(): void {

    window.scrollTo({ top: 0, behavior: 'smooth' });

  }



  isAddressValid(): boolean {

    return !!(

      this.address.fullName &&

      this.address.street &&

      this.address.city &&

      this.address.postalCode &&

      this.address.phone

    );

  }



  placeOrder(): void {

    this.orderService.createOrder(this.address, this.paymentMethod).subscribe({

      next: (order) => {

        if (this.couponApplied && this.discount > 0) {

          order = {

            ...order,

            subtotal: this.subtotal - this.discount,

            total: this.total,

          };

        }

        this.completedOrder = order;

        this.cartService.clearCart();

        sessionStorage.removeItem(CheckoutComponent.COUPON_STORAGE_KEY);

        this.orderComplete = true;

        this.step = 4;

        this.scrollToTop();

      },

    });

  }

}


