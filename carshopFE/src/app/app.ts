import {Component} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import polishTranslation from "@/app/shared/i18n/pl.json";
import englishTranslation from "@/app/shared/i18n/en.json";
import {NavbarComponent} from "@/app/shared/components/navbar-component/navbar-component";
import {FooterComponent} from "@/app/shared/components/footer-component/footer-component";
import {RouterOutlet} from "@angular/router";

@Component({
    selector: 'app-root',
    imports: [NavbarComponent, FooterComponent, RouterOutlet],
    templateUrl: './app.html',
    styleUrl: './app.css'
})
export class App {
    constructor(private translate: TranslateService) {
        this.translate.addLangs(['pl', 'en']);
        this.translate.setTranslation('pl', polishTranslation);
        this.translate.setTranslation('en', englishTranslation);
        this.translate.setFallbackLang('pl');
        this.translate.use('pl');
    }
}
