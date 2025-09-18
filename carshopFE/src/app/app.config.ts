import {
    ApplicationConfig,
    importProvidersFrom,
    provideBrowserGlobalErrorListeners,
    provideZoneChangeDetection
} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideHttpClient} from "@angular/common/http";
import {en_US, provideNzI18n} from 'ng-zorro-antd/i18n';
import {registerLocaleData} from '@angular/common';
import en from '@angular/common/locales/en';
import {FormsModule} from '@angular/forms';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {provideTranslateService} from "@ngx-translate/core";
import {provideKeycloak} from "keycloak-angular";

registerLocaleData(en);

export const appConfig: ApplicationConfig = {
    providers: [
        provideBrowserGlobalErrorListeners(),
        provideZoneChangeDetection({eventCoalescing: true}),
        provideRouter(routes),
        provideHttpClient(),
        provideNzI18n(en_US),
        importProvidersFrom(FormsModule),
        provideAnimationsAsync(),
        provideTranslateService({fallbackLang: 'pl', lang: 'pl'}),
        provideKeycloak({
            config: {
                url: '/auth',
                realm: 'CarShop',
                clientId: 'frontend'
            },
            initOptions: {
                onLoad: 'check-sso',
                checkLoginIframe: false,
                silentCheckSsoRedirectUri: `${window.location.origin}/assets/silent-check-sso.html`,
                pkceMethod: 'S256',
            },
        }),
    ]
}
