// currency.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  private currency: string = 'EUR';
  setCurrency(currency: string) {
    this.currency = currency;
    localStorage.setItem('selectedCurrency', currency);
  }

  getCurrency(): string {
    return this.currency;
  }

  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: this.currency
    }).format(amount);
  }
}