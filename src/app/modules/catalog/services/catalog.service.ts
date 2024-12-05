import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService } from '../../../services/config.service';
import { Category } from '../model/Category';
import { PageProductResponse } from '../model/PageProductResponse';
import { PageStateService } from '../view/catalog.component';
import { Product } from '../../../model/product';

@Injectable()
export class CatalogService {
  private apiProductsUrl;
  private apiCategoriesUrl;
  private apiProductByCategoriesUrl;

  constructor(private http: HttpClient, private configService: ConfigService) {
    const config = this.configService.getConfig();
    this.apiProductsUrl = config ? config.sourceSystem + '/products' : '';
    this.apiCategoriesUrl = config ? config.sourceSystem + '/categories' : '';
    this.apiProductByCategoriesUrl = config ? config.sourceSystem + '/products/category' : '';
  }

  getProducts(page: PageStateService): Observable<PageProductResponse> {
    const params = new HttpParams().set('page', page.page.toString()).set('size', page.rows.toString());
    return this.http.get<PageProductResponse>(this.apiProductsUrl, { params });
  }

  getProductsByCategory(categoryId: number): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiProductByCategoriesUrl}/${categoryId}`);
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.apiCategoriesUrl);
  }
}
