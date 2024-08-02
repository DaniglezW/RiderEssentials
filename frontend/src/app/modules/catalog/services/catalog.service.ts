import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../model/product';
import { Observable } from 'rxjs';
import { ConfigService } from '../../../services/config.service';

@Injectable()
export class CatalogService {
  private apiUrl;

  constructor(private http: HttpClient, private configService: ConfigService) {
    const config = this.configService.getConfig();
    this.apiUrl = config ? config.sourceSystem + '/products' : '';
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }
}
