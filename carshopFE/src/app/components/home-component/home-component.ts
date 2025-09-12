import {Component} from '@angular/core';
import {NzFlexDirective} from "ng-zorro-antd/flex";
import {CarCardComponent} from "../car-card-component/car-card-component";
import {NzCardComponent} from "ng-zorro-antd/card";
import {TranslatePipe, TranslateService} from "@ngx-translate/core";

@Component({
    selector: 'app-home-component',
    imports: [
        NzFlexDirective,
        CarCardComponent,
        NzCardComponent,
        TranslatePipe
    ],
    templateUrl: './home-component.html',
    styleUrls: ['./home-component.scss', '../../../assets/global-styles.scss']
})
export class HomeComponent {
    constructor(protected translateService: TranslateService) {
    }
}
