// currency.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  private currency: string = 'EUR';
  private rates: { [key: string]: number } = {
    'USD': 1.1,
    'EUR': 1,
    'JPY': 140,
    'GBP': 0.9,
    'AUD': 1.6,
    'CAD': 1.4
  };

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

  convertFromEuros(amount: number, toCurrency: string): number {
    const rate = this.rates[toCurrency] || 1;
    return amount * rate;
  }

  formatPriceInSelectedCurrency(amountInEuros: number): string {
    const convertedAmount = this.convertFromEuros(amountInEuros, this.currency);
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: this.currency
    }).format(convertedAmount);
  }
}