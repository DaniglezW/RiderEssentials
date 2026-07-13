import { Component, OnInit } from '@angular/core';
import { OrderService } from '@/app/services/order.service';
import { WishlistService } from '@/app/services/wishlist.service';
import { GarageService } from '@/app/services/garage.service';
import { CurrencyService } from '@/app/services/currency.service';
import { ProfileApiService } from '@/app/services/profile-api.service';
import { UserService } from '@/app/services/user.service';
import { Order } from '@/app/model/order';
import { Motorcycle } from '@/app/model/motorcycle';
import { Product } from '@/app/model/product';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  activeTab = 0;
  orders: Order[] = [];
  wishlist: Product[] = [];
  bikes: Motorcycle[] = [];
  saveMessage = '';

  user = { name: 'Rider', email: '' };

  constructor(
    private orderService: OrderService,
    private wishlistService: WishlistService,
    private garageService: GarageService,
    private currencyService: CurrencyService,
    private profileApi: ProfileApiService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.user.name = this.userService.getName();
    this.user.email = this.userService.getEmail();
    this.profileApi.getProfile().subscribe({
      next: (p) => {
        this.user.name = p.name;
        this.user.email = p.email;
      },
    });
    this.orderService.getOrders().subscribe((o) => (this.orders = o));
    this.wishlistService.getItems().subscribe((w) => (this.wishlist = w));
    this.garageService.getBikes().subscribe((b) => (this.bikes = b));
  }

  formatPrice(price: number): string {
    return this.currencyService.formatPriceInSelectedCurrency(price);
  }

  saveProfile(): void {
    this.profileApi.updateProfile(this.user.name, this.user.email).subscribe({
      next: (p) => {
        this.user.name = p.name;
        this.user.email = p.email;
        this.saveMessage = 'OK';
        setTimeout(() => (this.saveMessage = ''), 3000);
      },
    });
  }

  getStatusLabel(status: string): string {
    return `PROFILE.STATUS_${status.toUpperCase()}`;
  }
}
