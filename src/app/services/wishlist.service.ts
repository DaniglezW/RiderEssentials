import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap, catchError, of } from 'rxjs';
import { ConfigService } from './config.service';
import { Product } from '../model/product';

@Injectable({ providedIn: 'root' })
export class WishlistService {
  private items: Product[] = [];
  private subject = new BehaviorSubject<Product[]>([]);

  constructor(private http: HttpClient, private configService: ConfigService) {
    this.load();
  }

  private getApiUrl(): string {
    return this.configService.getConfig()?.sourceSystem || '';
  }

  private prepareProduct(product: Product): Product {
    if (product.image && typeof product.image === 'string' && !product.image.startsWith('data:')) {
      product.image = `data:image/jpeg;base64,${product.image}`;
    }
    return product;
  }

  load(): void {
    const apiUrl = this.getApiUrl();
    if (!apiUrl) return;
    this.http.get<Product[]>(`${apiUrl}/wishlist`).pipe(
      tap((items) => {
        this.items = items.map((p) => this.prepareProduct(p));
        this.subject.next([...this.items]);
      }),
      catchError(() => of([]))
    ).subscribe();
  }

  getItems(): Observable<Product[]> {
    return this.subject.asObservable();
  }

  getCount(): number {
    return this.items.length;
  }

  isInWishlist(productId: number): boolean {
    return this.items.some((p) => p.productId === productId);
  }

  toggle(product: Product): boolean {
    const apiUrl = this.getApiUrl();
    if (!apiUrl) return false;
    if (this.isInWishlist(product.productId)) {
      this.http.delete(`${apiUrl}/wishlist/${product.productId}`).pipe(
        tap(() => this.load())
      ).subscribe();
      return false;
    }
    this.http.post(`${apiUrl}/wishlist/${product.productId}`, {}).pipe(
      tap(() => this.load())
    ).subscribe();
    return true;
  }

  remove(productId: number): void {
    const apiUrl = this.getApiUrl();
    if (!apiUrl) return;
    this.http.delete(`${apiUrl}/wishlist/${productId}`).pipe(
      tap(() => this.load())
    ).subscribe();
  }
}
