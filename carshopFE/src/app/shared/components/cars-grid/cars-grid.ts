import {Component, input, output, TemplateRef} from '@angular/core';
import {NgTemplateOutlet} from '@angular/common';
import {NzPaginationComponent} from 'ng-zorro-antd/pagination';
import {NzSpinComponent} from 'ng-zorro-antd/spin';
import {CarCardComponent} from '@/app/shared/components/car-card-component/car-card-component';
import {SearchBarComponent} from '@/app/shared/components/search-bar/search-bar';
import {CarCardDto} from '@/app/domain/dto/CarCardDto';

@Component({
    selector: 'app-cars-grid',
    imports: [
        NgTemplateOutlet,
        NzPaginationComponent,
        NzSpinComponent,
        CarCardComponent,
        SearchBarComponent,
    ],
    templateUrl: './cars-grid.html',
    styleUrl: './cars-grid.scss',
})
export class CarsGridComponent {
    cars = input.required<CarCardDto[]>();
    isLoading = input<boolean>(false);
    totalRecordCount = input<number>(0);
    pageSize = input<number>(10);
    currentPage = input<number>(1);
    cardActionsTpl = input<TemplateRef<{$implicit: CarCardDto}> | null>(null);

    pageChange = output<number>();
    searchChange = output<string>();
}
