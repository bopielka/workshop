import {Component, inject} from '@angular/core';
import {ActivatedRoute, RouterLink} from "@angular/router";
import {CarCardComponent} from "@/app/shared/components/car-card-component/car-card-component";
import {TranslatePipe} from "@ngx-translate/core";
import {ContactPillComponent} from "@/app/shared/components/contact-pill/contact-pill";
import {PageWrapperComponent} from "@/app/layout/page-wrapper/page-wrapper";
import {CarCardDto} from "@/app/domain/dto/CarCardDto";
import {NzButtonComponent} from "ng-zorro-antd/button";
import {NzIconDirective} from 'ng-zorro-antd/icon';

@Component({
    selector: 'app-home-component',
    imports: [
        CarCardComponent,
        TranslatePipe,
        PageWrapperComponent,
        ContactPillComponent,
        RouterLink,
        NzButtonComponent,
        NzIconDirective,
    ],
    templateUrl: './home-component.html',
    styleUrls: ['./home-component.scss']
})
export class HomeComponent {
    protected cars: CarCardDto[] = inject(ActivatedRoute).snapshot.data['cars'];
}
