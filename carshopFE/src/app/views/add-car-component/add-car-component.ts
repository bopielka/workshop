import {Component, inject, TemplateRef, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {TranslatePipe, TranslateService} from '@ngx-translate/core';
import {NzUploadFile} from 'ng-zorro-antd/upload';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {NzIconDirective} from 'ng-zorro-antd/icon';
import {PageWrapperComponent} from '@/app/layout/page-wrapper/page-wrapper';
import {CarDto} from '@/app/domain/dto/CarDto';
import {FuelType} from '@/app/domain/types/FuelType';
import {GearboxType} from '@/app/domain/types/GearboxType';
import {BodyType} from '@/app/domain/types/BodyType';
import {injectCreateCarMutation} from '@/app/api/car/car-service';
import {MessageService} from '@/app/shared/services/message.service';
import {CarFormFieldsComponent} from '@/app/shared/components/car-form-fields/car-form-fields';

@Component({
    selector: 'app-add-car-component',
    imports: [
        ReactiveFormsModule,
        TranslatePipe,
        NzButtonComponent,
        NzIconDirective,
        PageWrapperComponent,
        CarFormFieldsComponent,
    ],
    templateUrl: './add-car-component.html',
    styleUrl: './add-car-component.scss',
})
export class AddCarComponent {
    @ViewChild('msgTpl') private msgTpl!: TemplateRef<void>;

    protected carDetailsForm!: FormGroup<{ [K in keyof Omit<CarDto, 'images'>]: FormControl<CarDto[K] | null> }>;
    protected fileList: NzUploadFile[] = [];
    protected coverUid: string | null = null;

    private router = inject(Router);
    protected msg = inject(MessageService);
    protected createCarMutation = injectCreateCarMutation();

    constructor(private fb: FormBuilder, protected translateService: TranslateService) {
        this.carDetailsForm = this.initializeForm();
    }

    get isFormValid(): boolean {
        return this.carDetailsForm.valid && this.fileList.length > 0;
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

    submitForm(isDraft = false): void {
        if (!this.isFormValid) return;

        const {id, ...carFields} = this.carDetailsForm.getRawValue();

        const files = [...this.fileList]
            .sort((a, b) => (a.uid === this.coverUid ? -1 : b.uid === this.coverUid ? 1 : 0))
            .map(f => f.originFileObj as File)
            .filter(Boolean);

        this.createCarMutation.mutate(
            {car: {...carFields as Omit<CarDto, 'id' | 'images'>, isDraft}, images: files},
            {
                onSuccess: () => {
                    this.msg.success('car_saved_success', this.msgTpl);
                    this.router.navigate(['/manage-cars']);
                },
                onError: () => {
                    this.msg.error('car_saved_error', this.msgTpl);
                },
            }
        );
    }
}
