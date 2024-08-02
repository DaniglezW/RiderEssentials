import { Component, OnInit } from '@angular/core';
import { CurrencyService } from '../../../services/currency.service';

@Component({
  selector: 'app-currency-selector',
  templateUrl: './currency-selector.component.html',
  styleUrl: './currency-selector.component.scss'
})
export class CurrencySelectorComponent implements OnInit {
  currencies = [
    { code: 'USD', name: 'USD - US Dollar' },
    { code: 'EUR', name: 'EUR - Euro' },
    { code: 'JPY', name: 'JPY - Japanese Yen' },
    { code: 'GBP', name: 'GBP - British Pound' },
    { code: 'AUD', name: 'AUD - Australian Dollar' },
    { code: 'CAD', name: 'CAD - Canadian Dollar' }
  ];
  selectedCurrency: any;
  modalOpen = false;

  constructor(private currencyService: CurrencyService) { }

  ngOnInit() {
    const defaultCurrency = localStorage.getItem('selectedCurrency') || 'EUR';
    this.currencyService.setCurrency(defaultCurrency);
    this.selectedCurrency = this.currencies.find(cur => cur.code === defaultCurrency) || this.currencies[1];
  }

  openModal() {
    this.modalOpen = true;
  }

  closeModal() {
    this.modalOpen = false;
  }

  selectCurrency(currency: any) {
    this.selectedCurrency = currency;
    this.currencyService.setCurrency(currency.code);
    this.closeModal();
  }
}
