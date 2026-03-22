import { Component, signal } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { PageWrapperComponent } from '@/app/layout/page-wrapper/page-wrapper';
import { ContactPillComponent } from '@/app/shared/components/contact-pill/contact-pill';
import { CarsGridComponent } from '@/app/shared/components/cars-grid/cars-grid';
import { injectCarsPageQuery } from '@/app/api/car/car-service';

@Component({
  selector: 'app-car-list-component',
  imports: [TranslatePipe, PageWrapperComponent, ContactPillComponent, CarsGridComponent],
  templateUrl: './car-list-component.html',
  styleUrl: './car-list-component.css',
})
export class CarListComponent {
  protected readonly pageSize = 12;
  protected currentPage = signal(1);
  protected searchQuery = signal('');

  protected carsQuery = injectCarsPageQuery(
    () => this.currentPage() - 1,
    this.pageSize,
    () => this.searchQuery(),
  );

  protected onPageChange(page: number): void {
    this.currentPage.set(page);
  }

  protected onSearchChange(search: string): void {
    this.searchQuery.set(search);
    this.currentPage.set(1);
  }
}
