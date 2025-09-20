import {Component} from '@angular/core';
import {NzButtonComponent} from "ng-zorro-antd/button";
import {NzIconDirective} from "ng-zorro-antd/icon";
import {TranslatePipe} from "@ngx-translate/core";
import {NzFlexDirective} from "ng-zorro-antd/flex";
import {RouterLink} from "@angular/router";

@Component({
    selector: 'app-manage-cars-component',
    imports: [
        NzButtonComponent,
        NzIconDirective,
        TranslatePipe,
        NzFlexDirective,
        RouterLink
    ],
    templateUrl: './manage-cars-component.html',
    styleUrl: './manage-cars-component.css'
})
export class ManageCarsComponent {

}
