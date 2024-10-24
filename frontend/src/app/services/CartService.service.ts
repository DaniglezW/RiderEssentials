import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: any[] = [];
  private cartItemsSubject = new BehaviorSubject<any[]>(this.cartItems);

  constructor() {
    this.loadCart();
  }

  addToCart(item: any) {
    this.loadCart();

    const existingItemIndex = this.cartItems.findIndex(cartItem => 
      cartItem.productId === item.productId && cartItem.size === item.size
    );

    if (existingItemIndex > -1) {
      this.cartItems[existingItemIndex].quantity += item.quantity;
    } else {
      this.cartItems.push(item);
    }

    this.saveCart();
    this.cartItemsSubject.next(this.cartItems);
  }

  loadCart() {
    const cart = localStorage.getItem('cart');
    this.cartItems = cart ? JSON.parse(cart) : [];
    this.cartItemsSubject.next(this.cartItems);
  }

  private saveCart() {
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
  }

  getCartItems() {
    return this.cartItemsSubject.asObservable();
  }

  clearCart() {
    this.cartItems = [];
    localStorage.removeItem('cart');
    this.cartItemsSubject.next(this.cartItems);
  }
}