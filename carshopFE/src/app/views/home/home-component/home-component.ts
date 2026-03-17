import {Component, OnInit} from '@angular/core';
import {CarCardComponent} from "@/app/shared/components/car-card-component/car-card-component";
import {NzCardComponent} from "ng-zorro-antd/card";
import {TranslatePipe, TranslateService} from "@ngx-translate/core";
import {HttpClient} from "@angular/common/http";
import {PageWrapperComponent} from "@/app/shared/components/page-wrapper/page-wrapper";

@Component({
    selector: 'app-home-component',
    imports: [
        CarCardComponent,
        NzCardComponent,
        TranslatePipe,
        PageWrapperComponent
    ],
    templateUrl: './home-component.html',
    styleUrls: ['./home-component.scss']
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
