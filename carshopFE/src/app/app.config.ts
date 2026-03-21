import {
    ApplicationConfig,
    importProvidersFrom,
    provideBrowserGlobalErrorListeners,
    provideZoneChangeDetection
} from '@angular/core';
import {provideRouter} from '@angular/router';
import {provideTanStackQuery, QueryClient} from '@tanstack/angular-query-experimental';

import {routes} from '@/app/app.routes';
import {provideHttpClient} from "@angular/common/http";
import {en_US, provideNzI18n} from 'ng-zorro-antd/i18n';
import {registerLocaleData} from '@angular/common';
import en from '@angular/common/locales/en';
import pl from '@angular/common/locales/pl';
import {FormsModule} from '@angular/forms';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {provideTranslateService} from "@ngx-translate/core";
import {provideKeycloak} from "keycloak-angular";

registerLocaleData(en);
registerLocaleData(pl);

export function buildAppConfig(realm: string, clientId: string): ApplicationConfig {
    return {
        providers: [
            provideBrowserGlobalErrorListeners(),
            provideZoneChangeDetection({eventCoalescing: true}),
            provideRouter(routes),
            provideHttpClient(),
            provideNzI18n(en_US),
            importProvidersFrom(FormsModule),
            provideAnimationsAsync(),
            provideTranslateService({fallbackLang: 'pl', lang: 'pl'}),
            provideTanStackQuery(new QueryClient()),
            provideKeycloak({
                config: {
                    url: '/auth',
                    realm,
                    clientId,
                },
                initOptions: {
                    onLoad: 'check-sso',
                    checkLoginIframe: false,
                    silentCheckSsoRedirectUri: `${window.location.origin}/assets/silent-check-sso.html`,
                    pkceMethod: 'S256',
                },
            }),
        ]
    };
}
