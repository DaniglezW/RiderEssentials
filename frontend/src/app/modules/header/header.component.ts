import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

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

  selectedLanguage: any;
  dropdownOpen = false;

  constructor(private translate: TranslateService) { }

  ngOnInit() {
    const defaultLang = localStorage.getItem('selectedLanguage') || 'es';
    this.translate.setDefaultLang(defaultLang);
    this.translate.use(defaultLang);
    this.selectedLanguage = this.languages.find(lang => lang.code === defaultLang) || this.languages[0];
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