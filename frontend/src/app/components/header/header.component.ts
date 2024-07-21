import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true
})
export class HeaderComponent {
  languages = [
    { code: 'es', name: 'Español' },
    { code: 'ca', name: 'Catalán' },
    { code: 'en', name: 'Inglés' },
    { code: 'pt', name: 'Portugués' }
  ];

  selectedLanguage: any;

  // constructor(private translate: TranslateService) {
    // this.selectedLanguage = this.languages[0];
    // this.translate.setDefaultLang(this.selectedLanguage.code);
    // this.translate.use(this.selectedLanguage.code);
  //}

  // changeLanguage(language: any) {
  //   this.translate.use(language.code);
  // }
}
