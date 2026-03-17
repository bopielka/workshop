import {Component} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {CarDto} from "@/app/domain/dto/CarDto";
import {FuelType} from "@/app/domain/types/FuelType";
import {GearboxType} from "@/app/domain/types/GearboxType";
import {BodyType} from "@/app/domain/types/BodyType";
import {NzFormControlComponent, NzFormDirective, NzFormItemComponent, NzFormLabelComponent} from "ng-zorro-antd/form";
import {NzInputDirective, NzInputWrapperComponent} from "ng-zorro-antd/input";
import {TranslatePipe, TranslateService} from "@ngx-translate/core";
import {NzUploadComponent, NzUploadFile} from "ng-zorro-antd/upload";
import {NzIconDirective} from "ng-zorro-antd/icon";
import {NzOptionComponent, NzSelectComponent} from "ng-zorro-antd/select";
import {fuelTypes} from "@/app/domain/types/FuelType";
import {gearboxTypes} from "@/app/domain/types/GearboxType";
import {bodyTypes} from "@/app/domain/types/BodyType";
import {NzModalComponent, NzModalModule} from "ng-zorro-antd/modal";
import {NzColDirective, NzRowDirective} from "ng-zorro-antd/grid";
import {NzButtonComponent} from "ng-zorro-antd/button";
import {PageWrapperComponent} from "@/app/shared/components/page-wrapper/page-wrapper";
import {ImageCarouselComponent} from "@/app/shared/components/image-carousel/image-carousel";

const getBase64 = (file: File): Promise<string | ArrayBuffer | null> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });

@Component({
    selector: 'app-add-car-component',
    imports: [
        NzFormDirective,
        ReactiveFormsModule,
        NzFormItemComponent,
        NzFormLabelComponent,
        NzFormControlComponent,
        NzInputDirective,
        TranslatePipe,
        NzUploadComponent,
        NzIconDirective,
        NzSelectComponent,
        NzOptionComponent,
        NzModalComponent,
        NzModalModule,
        NzRowDirective,
        NzColDirective,
        NzInputWrapperComponent,
        PageWrapperComponent,
        NzButtonComponent,
        ImageCarouselComponent
    ],
    templateUrl: './add-car-component.html',
    styleUrl: './add-car-component.scss'
})
export class AddCarComponent {

    protected carDetailsForm!: FormGroup<{ [K in keyof Omit<CarDto, 'images'>]: FormControl<CarDto[K] | null> }>;

    fileList: NzUploadFile[] = [];
    coverUid: string | null = null;
    previewImage: string | undefined = '';
    previewVisible = false;

    protected fuelTypes = fuelTypes;
    protected gearboxTypes = gearboxTypes;
    protected bodyTypes = bodyTypes;

    uploadPhoto = (file: NzUploadFile) => {
        //todo
        return 'todo';
    }

    constructor(private fb: FormBuilder,
                protected translateService: TranslateService,) {
        this.carDetailsForm = this.initializeForm();
    }

    private initializeForm() {
        return this.fb.group<{ [K in keyof Omit<CarDto, 'images'>]: FormControl<CarDto[K] | null> }>({
            id: this.fb.control<string | null>(null),
            model: this.fb.control<string | null>(null),
            make: this.fb.control<string | null>(null),
            yearOfProduction: this.fb.control<number | null>(null),
            mileage: this.fb.control<number | null>(null),
            fuelType: this.fb.control<FuelType | null>(null),
            power: this.fb.control<number | null>(null),
            capacity: this.fb.control<number | null>(null),
            doorCount: this.fb.control<number | null>(null),
            bodyType: this.fb.control<BodyType | null>(null),
            gearboxType: this.fb.control<GearboxType | null>(null),
            description: this.fb.control<string | null>(null),
            price: this.fb.control<number | null>(null),
        });
    }

    onRemoveFile(uid: string): void {
        this.fileList = this.fileList.filter(f => f.uid !== uid);
        if (this.coverUid === uid) this.coverUid = null;
    }

    onSetCover(uid: string): void {
        this.coverUid = uid;
    }

    submitForm() {
        //todo
    }

    handlePreview = async (file: NzUploadFile): Promise<void> => {
        if (!file.url && !file["preview"]) {
            file["preview"] = await getBase64(file.originFileObj!);
        }
        this.previewImage = file.url || file["preview"];
        this.previewVisible = true;
    };

}
