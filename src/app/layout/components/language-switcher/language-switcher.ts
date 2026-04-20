import { Component, signal, inject } from '@angular/core';
import { NgClass } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { I18N_IMPORTS } from '../../../shared/shared-imports';

@Component({
  selector: 'app-language-switcher',
  imports: [NgClass, I18N_IMPORTS],
  templateUrl: './language-switcher.html',
  styleUrl: './language-switcher.css',
  standalone: true,
})
export class LanguageSwitcher {
  private translate = inject(TranslateService);
  currentLang = signal('es');

  constructor() {
    const savedLang = localStorage.getItem('lang') || 'es';
    this.currentLang.set(savedLang);
    this.translate.use(savedLang);
  }

  changeLang(lang: string) {
    this.currentLang.set(lang);
    this.translate.use(lang);
    localStorage.setItem('lang', lang);
  }

  isActive(lang: string) {
    return this.currentLang() === lang;
  }
}
