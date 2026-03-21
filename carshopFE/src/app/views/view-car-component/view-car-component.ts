import {Component, computed, effect, inject, TemplateRef, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {toSignal} from '@angular/core/rxjs-interop';
import {map} from 'rxjs';
import {CurrencyPipe, DecimalPipe, LowerCasePipe} from '@angular/common';
import {TranslatePipe, TranslateService} from '@ngx-translate/core';
import {NzSpinComponent} from 'ng-zorro-antd/spin';
import {NzUploadFile} from 'ng-zorro-antd/upload';
import {NzModalModule, NzModalRef, NzModalService} from 'ng-zorro-antd/modal';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {NzIconDirective} from 'ng-zorro-antd/icon';
import {PageWrapperComponent} from '@/app/layout/page-wrapper/page-wrapper';
import {ImageCarouselComponent} from '@/app/shared/components/image-carousel/image-carousel';
import {injectCarQuery, injectUpdateCarMutation} from '@/app/api/car/car-service';
import {AuthService} from '@/app/shared/services/auth.service';
import {Role} from '@/app/domain/enums/Role';
import {EditCarFormComponent} from '@/app/views/edit-car-component/edit-car-component';

@Component({
    selector: 'app-view-car-component',
    imports: [
        PageWrapperComponent,
        ImageCarouselComponent,
        TranslatePipe,
        CurrencyPipe,
        DecimalPipe,
        LowerCasePipe,
        NzSpinComponent,
        NzModalModule,
        NzButtonComponent,
        NzIconDirective,
    ],
    templateUrl: './view-car-component.html',
    styleUrl: './view-car-component.scss',
})
export class ViewCarComponent {
    @ViewChild('galleryTpl') private galleryTpl!: TemplateRef<void>;

    private idParam = toSignal(
        inject(ActivatedRoute).paramMap.pipe(map(p => Number(p.get('id')))),
        {initialValue: 0}
    );
    private modalService = inject(NzModalService);
    private translateService = inject(TranslateService);
    private router = inject(Router);
    protected authService = inject(AuthService);
    protected readonly Role = Role;

    protected carQuery = injectCarQuery(() => this.idParam());
    protected toggleDraftMutation = injectUpdateCarMutation();
    protected modalRef: NzModalRef | null = null;

    constructor() {
        effect(() => {
            const car = this.carQuery.data();
            if (car?.isDraft && !this.authService.hasRole(Role.MANAGE_CARS)) {
                this.router.navigate(['/home']);
            }
        });
    }

    protected title = computed(() => {
        const car = this.carQuery.data();
        return car ? `${car.model} ${car.make}` : '';
    });

    protected carouselFiles = computed((): NzUploadFile[] => {
        const car = this.carQuery.data();
        if (!car) return [];
        const main = car.images.find(img => img.isMain);
        const rest = car.images.filter(img => !img.isMain);
        return (main ? [main, ...rest] : car.images).map(img => ({
            uid: img.id,
            name: img.filename,
            url: `/api/cars/images/${img.id}`,
        }));
    });

    protected coverUid = computed((): string | null => {
        const car = this.carQuery.data();
        if (!car) return null;
        return car.images.find(img => img.isMain)?.id ?? null;
    });

    openGalleryModal(): void {
        this.modalRef = this.modalService.create({
            nzContent: this.galleryTpl,
            nzWidth: '80vw',
            nzBodyStyle: {padding: '0', overflow: 'hidden', position: 'relative', height: '80vh'},
            nzFooter: null,
            nzClosable: false,
            nzClassName: 'gallery-modal',
        });
    }

    protected closeGalleryModal(): void {
        this.modalRef?.close();
    }

    protected toggleDraft(): void {
        const car = this.carQuery.data();
        if (!car) return;
        const {images, id, ...carFields} = car;
        this.toggleDraftMutation.mutate({
            id: Number(id),
            car: {...carFields, isDraft: !car.isDraft},
            keepImageIds: images.map(img => Number(img.id)),
            newImages: [],
        });
    }

    protected openEditModal(): void {
        this.modalService.create({
            nzContent: EditCarFormComponent,
            nzData: {id: this.idParam()},
            nzTitle: this.translateService.instant('edit'),
            nzWidth: '90vw',
            nzFooter: null,
            nzClassName: 'car-edit-modal',
            nzBodyStyle: {padding: '20px 24px', overflowY: 'auto', maxHeight: '85vh'},
        });
    }
}
