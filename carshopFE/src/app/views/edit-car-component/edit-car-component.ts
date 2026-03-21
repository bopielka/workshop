import {Component, effect, inject, TemplateRef, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {TranslatePipe, TranslateService} from '@ngx-translate/core';
import {NZ_MODAL_DATA, NzModalModule, NzModalRef} from 'ng-zorro-antd/modal';
import {NzUploadFile} from 'ng-zorro-antd/upload';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {NzIconDirective} from 'ng-zorro-antd/icon';
import {NzSpinComponent} from 'ng-zorro-antd/spin';
import {CarDto} from '@/app/domain/dto/CarDto';
import {FuelType} from '@/app/domain/types/FuelType';
import {GearboxType} from '@/app/domain/types/GearboxType';
import {BodyType} from '@/app/domain/types/BodyType';
import {injectCarQuery, injectUpdateCarMutation} from '@/app/api/car/car-service';
import {MessageService} from '@/app/shared/services/message.service';
import {CarFormFieldsComponent} from '@/app/shared/components/car-form-fields/car-form-fields';
import {AuthService} from '@/app/shared/services/auth.service';
import {Role} from '@/app/domain/enums/Role';

@Component({
    selector: 'app-edit-car-form',
    imports: [
        ReactiveFormsModule,
        TranslatePipe,
        NzModalModule,
        NzButtonComponent,
        NzIconDirective,
        NzSpinComponent,
        CarFormFieldsComponent,
    ],
    templateUrl: './edit-car-component.html',
    styleUrl: './edit-car-component.scss',
})
export class EditCarFormComponent {
    @ViewChild('msgTpl') private msgTpl!: TemplateRef<void>;

    protected readonly carId = inject<{id: number}>(NZ_MODAL_DATA).id;
    private modalRef = inject(NzModalRef);
    protected msg = inject(MessageService);
    protected authService = inject(AuthService);
    protected readonly Role = Role;

    protected carQuery = injectCarQuery(() => this.carId);
    protected updateMutation = injectUpdateCarMutation();

    protected carDetailsForm!: FormGroup<{ [K in keyof Omit<CarDto, 'images'>]: FormControl<CarDto[K] | null> }>;
    protected fileList: NzUploadFile[] = [];
    protected coverUid: string | null = null;

    private prefilled = false;

    constructor(private fb: FormBuilder, protected translateService: TranslateService) {
        this.carDetailsForm = this.initializeForm();
        effect(() => {
            const car = this.carQuery.data();
            if (car && !this.prefilled) {
                this.prefilled = true;
                this.prefillForm(car);
            }
        });
    }

    get isFormValid(): boolean {
        return this.carDetailsForm?.valid && this.fileList.length > 0;
    }

    private initializeForm() {
        return this.fb.group<{ [K in keyof Omit<CarDto, 'images'>]: FormControl<CarDto[K] | null> }>({
            id: this.fb.control<string | null>(null),
            model: this.fb.control<string | null>(null, Validators.required),
            make: this.fb.control<string | null>(null, Validators.required),
            yearOfProduction: this.fb.control<number | null>(null, [Validators.required, Validators.min(1886)]),
            mileage: this.fb.control<number | null>(null, [Validators.required, Validators.min(0)]),
            fuelType: this.fb.control<FuelType | null>(null, Validators.required),
            power: this.fb.control<number | null>(null, [Validators.required, Validators.min(1)]),
            capacity: this.fb.control<number | null>(null, [Validators.required, Validators.min(1)]),
            doorCount: this.fb.control<number | null>(null, [Validators.required, Validators.min(1), Validators.max(9)]),
            bodyType: this.fb.control<BodyType | null>(null, Validators.required),
            gearboxType: this.fb.control<GearboxType | null>(null, Validators.required),
            description: this.fb.control<string | null>(null, Validators.required),
            price: this.fb.control<number | null>(null, [Validators.required, Validators.min(0)]),
            isDraft: this.fb.control<boolean | null>(false),
        });
    }

    private prefillForm(car: CarDto): void {
        this.carDetailsForm.patchValue({
            id: car.id,
            model: car.model,
            make: car.make,
            yearOfProduction: car.yearOfProduction,
            mileage: car.mileage,
            fuelType: car.fuelType,
            power: car.power,
            capacity: car.capacity,
            doorCount: car.doorCount,
            bodyType: car.bodyType,
            gearboxType: car.gearboxType,
            description: car.description,
            price: car.price,
            isDraft: car.isDraft,
        });
        const main = car.images.find(img => img.isMain);
        const rest = car.images.filter(img => !img.isMain);
        const sorted = main ? [main, ...rest] : car.images;
        this.fileList = sorted.map(img => ({
            uid: img.id,
            name: img.filename,
            url: `/api/cars/images/${img.id}`,
            status: 'done' as const,
            percent: 100,
        }));
        this.coverUid = main?.id ?? null;
    }

    close(): void {
        this.modalRef.close();
    }

    toggleDraft(): void {
        const current = this.carDetailsForm.getRawValue().isDraft;
        this.carDetailsForm.patchValue({isDraft: !current});
        this.submitForm();
    }

    submitForm(): void {
        if (!this.isFormValid) return;

        const {id, ...carFields} = this.carDetailsForm.getRawValue();

        const sorted = [...this.fileList].sort((a, b) =>
            a.uid === this.coverUid ? -1 : b.uid === this.coverUid ? 1 : 0
        );

        const keepImageIds = sorted.filter(f => !f.originFileObj).map(f => Number(f.uid));
        const newImages = sorted.filter(f => !!f.originFileObj).map(f => f.originFileObj as File);

        this.updateMutation.mutate(
            {id: Number(id), car: carFields as Omit<CarDto, 'id' | 'images'>, keepImageIds, newImages},
            {
                onSuccess: () => {
                    this.msg.success('car_saved_success', this.msgTpl);
                    this.modalRef.close();
                },
                onError: () => {
                    this.msg.error('car_saved_error', this.msgTpl);
                },
            }
        );
    }
}
