import {Component, OnInit} from '@angular/core';
import {NzFlexDirective} from "ng-zorro-antd/flex";
import {CarCardComponent} from "../car-card-component/car-card-component";
import {NzCardComponent} from "ng-zorro-antd/card";
import {TranslatePipe, TranslateService} from "@ngx-translate/core";
import {HttpClient} from "@angular/common/http";

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
export class HomeComponent implements OnInit {
    message!: string;

    constructor(protected translateService: TranslateService,
                protected http: HttpClient,) {
    }

    ngOnInit() {
        this.http.get<TestEntity>('/api/test').subscribe(value => {
            this.message = value.message ?? 'nie działa xD'
        });
    }
}

export interface TestEntity {
    id: number;
    message: string;
}
