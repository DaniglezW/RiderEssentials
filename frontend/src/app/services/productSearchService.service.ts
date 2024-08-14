import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PageProductResponse } from '../modules/catalog/model/PageProductResponse';

@Injectable({
  providedIn: 'root'
})
export class ProductSearchService {

  private productsSource = new BehaviorSubject<PageProductResponse | null>(null);
  currentProducts = this.productsSource.asObservable();

  constructor() { }

  changeProducts(products: PageProductResponse) {
    this.productsSource.next(products);
  }
}