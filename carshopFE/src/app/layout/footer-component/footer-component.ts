import {Component} from '@angular/core';
import {NzIconDirective} from "ng-zorro-antd/icon";
import {TranslatePipe} from "@ngx-translate/core";

@Component({
    selector: 'app-footer-component',
    imports: [
        NzIconDirective,
        TranslatePipe
    ],
    templateUrl: './footer-component.html',
    styleUrls: ['./footer-component.scss']
})
export class FooterComponent {

    openLinkedInInNewWindow() {
        window.open('https://www.linkedin.com/in/bopielka/');
    }
}
