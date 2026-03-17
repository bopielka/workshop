import {Component} from '@angular/core';
import {NzButtonComponent} from "ng-zorro-antd/button";
import {NzIconDirective} from "ng-zorro-antd/icon";
import {TranslatePipe} from "@ngx-translate/core";
import {RouterLink} from "@angular/router";
import {PageWrapperComponent} from "@/app/shared/components/page-wrapper/page-wrapper";

@Component({
    selector: 'app-manage-cars-component',
    imports: [
        NzButtonComponent,
        NzIconDirective,
        TranslatePipe,
        RouterLink,
        PageWrapperComponent
    ],
    templateUrl: './manage-cars-component.html',
    styleUrl: './manage-cars-component.css'
})
export class ManageCarsComponent {

}
