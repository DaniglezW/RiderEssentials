import { Component } from '@angular/core';
import { CatalogComponent } from './components/catalog/catalog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [CatalogComponent],
  standalone: true
})
export class AppComponent {
  // constructor(private translate: TranslateService) {
  //   this.translate.addLangs(['en', 'es', 'pt', 'ca']);
  //   this.translate.setDefaultLang('es');

  //   const browserLang = this.translate.getBrowserLang();
  //   const langToUse = browserLang?.match(/en|es|pt|ca/) ? browserLang : 'es';
  //   this.translate.use(langToUse);
  // }
}
