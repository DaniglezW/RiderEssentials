import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService } from '../../../services/config.service';
import { Product } from '../../../model/product';
import { PageProductResponse } from '../../catalog/model/PageProductResponse';

@Injectable()
export class ProductService {
  private apiProductsUrl;

  constructor(private http: HttpClient, private configService: ConfigService) {
    const config = this.configService.getConfig();
    this.apiProductsUrl = config ? config.sourceSystem + '/products' : '';
  }

  getProductById(productId: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiProductsUrl}/${productId}`);
  }

  getProductsByFilter(minPrice: number, maxPrice: number): Observable<Product[]> {
    const url = `${this.apiProductsUrl}/price?minPrice=${minPrice}&maxPrice=${maxPrice}`;
    return this.http.get<Product[]>(url);
  }

  searchProducts(term: string): Observable<PageProductResponse> {
    return this.http.get<PageProductResponse>(`${this.apiProductsUrl}/search?query=${term}`);
  }
}
