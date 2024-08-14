import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ProductService } from '../product/services/productService.service';
import { ProductSearchService } from '../../services/productSearchService.service';
import { PageProductResponse } from '../catalog/model/PageProductResponse';
import { CatalogService } from '../catalog/services/catalog.service';

export class PageStateService {
  page: number = 0;
  rows: number = 12;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  languages = [
    { code: 'es', name: 'Español' },
    { code: 'ca', name: 'Català' },
    { code: 'en', name: 'English' },
    { code: 'pt', name: 'Português' }
  ];

  searchTerm: string = '';
  selectedLanguage: any;
  dropdownOpen = false;

  constructor(private translate: TranslateService, 
    private productService: ProductService, 
    private productSearchService: ProductSearchService,
    private catalogService: CatalogService
  ) { }

  ngOnInit() {
    const defaultLang = localStorage.getItem('selectedLanguage') || 'es';
    this.translate.setDefaultLang(defaultLang);
    this.translate.use(defaultLang);
    this.selectedLanguage = this.languages.find(lang => lang.code === defaultLang) || this.languages[0];
  }

  onSearch(term: string) {
    this.searchTerm = term;

    if (term.trim().length === 0) {
      this.catalogService.getProducts(new PageStateService).subscribe((response: PageProductResponse) => {
        this.productSearchService.changeProducts(response);
      });
    } else {
      this.productService.searchProducts(term).subscribe((response: PageProductResponse) => {
        this.productSearchService.changeProducts(response);
      });
    }
  }

  changeLanguage(language: any) {
    this.translate.use(language.code);
    localStorage.setItem('selectedLanguage', language.code);
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  selectLanguage(language: any) {
    this.selectedLanguage = language;
    this.translate.use(language.code);
    localStorage.setItem('selectedLanguage', language.code);
    this.dropdownOpen = false;
  }
}