import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap, catchError, of, switchMap, map } from 'rxjs';
import { ConfigService } from './config.service';
import { Order, ShippingAddress } from '../model/order';
import { CartItem } from '../model/cart-item';

@Injectable({ providedIn: 'root' })
export class OrderService {
  private orders: Order[] = [];
  private subject = new BehaviorSubject<Order[]>([]);

  constructor(private http: HttpClient, private configService: ConfigService) {
    this.load();
  }

  private getApiUrl(): string {
    return this.configService.getConfig()?.sourceSystem || '';
  }

  private mapOrder(dto: any): Order {
    return {
      id: dto.id,
      items: (dto.items || []).map((i: any) => ({
        productId: i.productId,
        name: i.name,
        image: i.image?.startsWith('data:') ? i.image : `data:image/jpeg;base64,${i.image || ''}`,
        price: Number(i.price),
        quantity: i.quantity,
        size: i.size,
        brand: i.brand,
      })) as CartItem[],
      subtotal: Number(dto.subtotal),
      shipping: Number(dto.shipping),
      total: Number(dto.total),
      address: dto.address as ShippingAddress,
      paymentMethod: dto.paymentMethod,
      status: dto.status,
      createdAt: dto.createdAt,
    };
  }

  private load(): void {
    const apiUrl = this.getApiUrl();
    if (!apiUrl) return;
    this.http.get<any[]>(`${apiUrl}/orders`).pipe(
      tap((orders) => {
        this.orders = orders.map((o) => this.mapOrder(o));
        this.subject.next([...this.orders]);
      }),
      catchError(() => of([]))
    ).subscribe();
  }

  getOrders(): Observable<Order[]> {
    return this.subject.asObservable();
  }

  createOrder(address: ShippingAddress, paymentMethod: string): Observable<Order> {
    const apiUrl = this.getApiUrl();
    return this.http.post<any>(`${apiUrl}/orders`, {
      fullName: address.fullName,
      street: address.street,
      city: address.city,
      postalCode: address.postalCode,
      country: address.country,
      phone: address.phone,
      paymentMethod,
    }).pipe(
      map((dto) => {
        const order = this.mapOrder(dto);
        this.orders.unshift(order);
        this.subject.next([...this.orders]);
        return order;
      })
    );
  }
}
