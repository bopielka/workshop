import {Component, signal} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import polishTranslation from "@/app/shared/i18n/pl.json";
import englishTranslation from "@/app/shared/i18n/en.json";
import {NavbarComponent} from "@/app/layout/navbar-component/navbar-component";
import {FooterComponent} from "@/app/layout/footer-component/footer-component";
import {NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterOutlet} from "@angular/router";
import {NzSpinComponent} from "ng-zorro-antd/spin";

@Component({
    selector: 'app-root',
    imports: [NavbarComponent, FooterComponent, RouterOutlet, NzSpinComponent],
    templateUrl: './app.html',
    styleUrl: './app.css'
})
export class App {
    protected loading = signal(false);

    constructor(private translate: TranslateService, router: Router) {
        this.translate.addLangs(['pl', 'en']);
        this.translate.setTranslation('pl', polishTranslation);
        this.translate.setTranslation('en', englishTranslation);
        this.translate.setFallbackLang('pl');
        this.translate.use('pl');

        router.events.subscribe(event => {
            if (event instanceof NavigationStart) this.loading.set(true);
            if (event instanceof NavigationEnd || event instanceof NavigationCancel || event instanceof NavigationError) {
                this.loading.set(false);
            }
        });
    }
}
