import {Component} from '@angular/core';
import {TranslatePipe} from "@ngx-translate/core";
import {PageWrapperComponent} from "@/app/shared/components/page-wrapper/page-wrapper";

@Component({
    selector: 'app-car-list-component',
    imports: [
        TranslatePipe,
        PageWrapperComponent
    ],
    templateUrl: './car-list-component.html',
    styleUrl: './car-list-component.css'
})
export class CarListComponent {

}
