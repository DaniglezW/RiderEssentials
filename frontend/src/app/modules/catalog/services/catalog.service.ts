import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../model/product';
import { Observable } from 'rxjs';
import { ConfigService } from '../../../services/config.service';
import { Category } from '../model/Category';

@Injectable()
export class CatalogService {
  private apiProductsUrl;
  private apiCategoriesUrl;

  constructor(private http: HttpClient, private configService: ConfigService) {
    const config = this.configService.getConfig();
    this.apiProductsUrl = config ? config.sourceSystem + '/products' : '';
    this.apiCategoriesUrl = config ? config.sourceSystem + '/categories' : '';
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiProductsUrl);
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.apiCategoriesUrl);
  }
}
