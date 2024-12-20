import { HttpClient, HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';
import { APP_INITIALIZER, DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutComponent } from './modules/ui/layout/layout.component';
import { HeaderComponent } from './modules/header/header.component';
import { FooterComponent } from './modules/footer/footer.component';
import { PrimeNgModule } from './prime-ng.module';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { BrowserModule  } from '@angular/platform-browser';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ScrollToTopComponent } from './modules/ui/scroll-to-top/scroll-to-top.component';
import { CurrencyService } from './services/currency.service';
import { CurrencySelectorComponent } from './modules/ui/currency-selector/currency-selector.component';
import { ConfigService } from './services/config.service';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { ProductService } from './modules/product/services/productService.service';
import { CatalogService } from './modules/catalog/services/catalog.service';

registerLocaleData(localeEs, 'es');

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, '../assets/i18n/', '.json');
}

export function loadConfig(configService: ConfigService) {
  return () => configService.loadConfig().toPromise();
}

@NgModule({
  declarations: [
    AppComponent, 
    LayoutComponent, 
    HeaderComponent, 
    FooterComponent, 
    ScrollToTopComponent, 
    CurrencySelectorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    HttpClientXsrfModule.withOptions(),
    NgbModule,
    PrimeNgModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'es' },
    {
      provide: DEFAULT_CURRENCY_CODE,
      useValue: 'EUR',
    },
    {
      provide: APP_INITIALIZER,
      useFactory: loadConfig,
      deps: [ConfigService],
      multi: true
    },
    CurrencyService,
    ConfigService,
    ProductService,
    CatalogService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
