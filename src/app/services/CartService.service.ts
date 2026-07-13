import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap, catchError, of, switchMap } from 'rxjs';
import { ConfigService } from './config.service';
import { CartItem } from '../model/cart-item';

interface CartSummary {
  subtotal: number;
  shipping: number;
  total: number;
  itemCount: number;
}

@Injectable({ providedIn: 'root' })
export class CartService {
  private cartItems: CartItem[] = [];
  private cartItemsSubject = new BehaviorSubject<CartItem[]>([]);
  private summary: CartSummary = { subtotal: 0, shipping: 0, total: 0, itemCount: 0 };

  constructor(private http: HttpClient, private configService: ConfigService) {}

  private getApiUrl(): string {
    return this.configService.getConfig()?.sourceSystem || '';
  }

  private mapImage(image: string | undefined): string {
    if (!image) return '';
    return image.startsWith('data:') ? image : `data:image/jpeg;base64,${image}`;
  }

  private mapItems(items: CartItem[]): CartItem[] {
    return items.map((i) => ({ ...i, image: this.mapImage(i.image), price: Number(i.price) }));
  }

  refresh(): void {
    const apiUrl = this.getApiUrl();
    if (!apiUrl) return;
    this.http.get<CartItem[]>(`${apiUrl}/cart`).pipe(
      switchMap((items) => {
        this.cartItems = this.mapItems(items);
        this.cartItemsSubject.next([...this.cartItems]);
        return this.http.get<CartSummary>(`${apiUrl}/cart/summary`);
      }),
      tap((s) => {
        if (s) {
          this.summary = {
            subtotal: Number(s.subtotal),
            shipping: Number(s.shipping),
            total: Number(s.total),
            itemCount: s.itemCount,
          };
        }
        this.cartItemsSubject.next([...this.cartItems]);
      }),
      catchError(() => of(null))
    ).subscribe();
  }

  addToCart(item: CartItem): void {
    const apiUrl = this.getApiUrl();
    if (!apiUrl) return;
    this.http.post(`${apiUrl}/cart/items`, {
      productId: item.productId,
      quantity: item.quantity,
      size: item.size || 'X',
    }).pipe(tap(() => this.refresh())).subscribe();
  }

  updateQuantity(productId: number, size: string, quantity: number): void {
    const apiUrl = this.getApiUrl();
    if (!apiUrl) return;
    this.http.put(`${apiUrl}/cart/items`, { productId, size, quantity }).pipe(
      tap(() => this.refresh())
    ).subscribe();
  }

  removeItem(productId: number, size: string): void {
    const apiUrl = this.getApiUrl();
    if (!apiUrl) return;
    this.http.delete(`${apiUrl}/cart/items`, {
      params: { productId: productId.toString(), size: size || 'X' },
    }).pipe(tap(() => this.refresh())).subscribe();
  }

  loadCart(): void {
    this.refresh();
  }

  getCartItems(): Observable<CartItem[]> {
    return this.cartItemsSubject.asObservable();
  }

  getItemCount(): number {
    return this.summary.itemCount;
  }

  getSubtotal(): number {
    return this.summary.subtotal;
  }

  getShippingCost(): number {
    return this.summary.shipping;
  }

  getTotal(): number {
    return this.summary.total;
  }

  clearCart(): void {
    const apiUrl = this.getApiUrl();
    if (!apiUrl) return;
    this.http.delete(`${apiUrl}/cart`).pipe(tap(() => this.refresh())).subscribe();
  }
}
