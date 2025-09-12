import {Component} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import polishTranslation from "../app/i18n/pl.json"
import {NavbarComponent} from "./components/navbar-component/navbar-component";
import {FooterComponent} from "./components/footer-component/footer-component";
import {NzColDirective, NzRowDirective} from "ng-zorro-antd/grid";
import {RouterOutlet} from "@angular/router";

@Component({
    selector: 'app-root',
    imports: [NavbarComponent, FooterComponent, NzRowDirective, NzColDirective, RouterOutlet],
    templateUrl: './app.html',
    styleUrl: './app.css'
})
export class App {
    constructor(private translate: TranslateService) {
        this.translate.addLangs(['pl']);
        this.translate.setTranslation('pl', polishTranslation)
        this.translate.setFallbackLang('pl');
        this.translate.use('pl');
    }
}
