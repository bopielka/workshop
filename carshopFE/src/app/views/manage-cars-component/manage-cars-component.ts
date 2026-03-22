import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { PageWrapperComponent } from '@/app/layout/page-wrapper/page-wrapper';
import { NzIconDirective } from 'ng-zorro-antd/icon';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { EditCarFormComponent } from '@/app/views/edit-car-component/edit-car-component';
import { DeleteConfirmComponent } from './delete-confirm/delete-confirm';
import { CarsGridComponent } from '@/app/shared/components/cars-grid/cars-grid';
import { injectCarsPageForManageQuery } from '@/app/api/car/car-service';

@Component({
  selector: 'app-manage-cars-component',
  imports: [
    TranslatePipe,
    PageWrapperComponent,
    NzIconDirective,
    NzButtonComponent,
    NzModalModule,
    RouterLink,
    CarsGridComponent,
  ],
  templateUrl: './manage-cars-component.html',
  styleUrl: './manage-cars-component.css',
})
export class ManageCarsComponent {
  protected readonly pageSize = 12;
  protected currentPage = signal(1);
  protected searchQuery = signal('');

  protected carsQuery = injectCarsPageForManageQuery(
    () => this.currentPage() - 1,
    this.pageSize,
    () => this.searchQuery(),
  );

  private modal = inject(NzModalService);

  constructor(protected translateService: TranslateService) {}

  protected onPageChange(page: number): void {
    this.currentPage.set(page);
  }

  protected onSearchChange(search: string): void {
    this.searchQuery.set(search);
    this.currentPage.set(1);
  }

  protected onDelete(id: string): void {
    this.modal.create({
      nzTitle: this.translateService.instant('delete_car_confirm'),
      nzContent: DeleteConfirmComponent,
      nzData: { id: Number(id) },
      nzFooter: null,
      nzClassName: 'confirm-modal',
      nzWidth: 416,
      nzBodyStyle: { padding: '16px 24px 24px' },
    });
  }

  protected onEdit(id: string): void {
    this.modal.create({
      nzContent: EditCarFormComponent,
      nzData: { id: Number(id) },
      nzTitle: this.translateService.instant('edit'),
      nzWidth: '90vw',
      nzFooter: null,
      nzClassName: 'car-edit-modal',
      nzBodyStyle: { padding: '20px 24px', overflowY: 'auto', maxHeight: '85vh' },
    });
  }
}
