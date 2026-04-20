import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './app/core/interceptors/auth.interceptor';
import { errorInterceptor } from './app/core/interceptors/error.interceptor';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { provideTimeago } from 'ngx-timeago';
import { importProvidersFrom } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { provideTranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader, TRANSLATE_HTTP_LOADER_CONFIG } from '@ngx-translate/http-loader';

bootstrapApplication(App, {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor, errorInterceptor])),
    provideTimeago(),
    {
      provide: TRANSLATE_HTTP_LOADER_CONFIG,
      useValue: {
        prefix: '/assets/i18n/',
        suffix: '.json',
      },
    },
    importProvidersFrom(
      TranslateModule.forRoot({
        loader: provideTranslateLoader(TranslateHttpLoader),
      }),
    ),
  ],
});
