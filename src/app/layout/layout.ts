import { Component, inject } from '@angular/core';
import { AppHeaderComponent } from './components/header/header';
import { RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-layout',
  imports: [AppHeaderComponent, RouterOutlet],
  templateUrl: './layout.html',
  standalone: true,
})
export class Layout {
  private translate = inject(TranslateService);

  constructor() {
    const savedLang = localStorage.getItem('lang');

    if (savedLang) {
      this.translate.use(savedLang);
    } else {
      const browserLang = this.translate.getBrowserLang();
      const lang = browserLang?.startsWith('en') ? 'en' : 'es';
      this.translate.use(lang);
    }
  }
}
