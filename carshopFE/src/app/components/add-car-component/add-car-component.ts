import {Component} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {NzFormControlComponent, NzFormDirective, NzFormItemComponent, NzFormLabelComponent} from "ng-zorro-antd/form";
import {NzColDirective, NzRowDirective} from "ng-zorro-antd/grid";
import {NzInputDirective, NzInputGroupComponent} from "ng-zorro-antd/input";
import {TranslatePipe, TranslateService} from "@ngx-translate/core";
import {NzUploadComponent, NzUploadFile} from "ng-zorro-antd/upload";
import {NzIconDirective} from "ng-zorro-antd/icon";
import {NzOptionComponent, NzSelectComponent} from "ng-zorro-antd/select";
import {fuelTypes} from "../../types/FuelType";
import {gearboxTypes} from "../../types/GearboxType";
import {bodyTypes} from "../../types/BodyType";
import {NzModalComponent, NzModalModule} from "ng-zorro-antd/modal";
import {Observable} from "rxjs";

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
        NzColDirective,
        NzInputDirective,
        TranslatePipe,
        NzUploadComponent,
        NzIconDirective,
        NzRowDirective,
        NzInputGroupComponent,
        NzSelectComponent,
        NzOptionComponent,
        NzModalComponent,
        NzModalModule
    ],
    templateUrl: './add-car-component.html',
    styleUrl: './add-car-component.scss'
})
export class AddCarComponent {

    protected carDetailsForm!: FormGroup;

    fileList: NzUploadFile[] = [];
    previewImage: string | undefined = '';
    previewVisible = false;

    protected fuelTypes = fuelTypes;
    protected gearboxTypes = gearboxTypes;
    protected bodyTypes = bodyTypes;

    uploadPhoto = (file: NzUploadFile) => {
        console.log(file);
        return 'test';
    }

    constructor(private fb: FormBuilder,
                protected translateService: TranslateService,) {
        this.carDetailsForm = this.initializeForm();
    }

    private initializeForm() {
        return this.fb.group({
            id: this.fb.control(''),
            model: this.fb.control(''),
            make: this.fb.control(''),
            yearOfProduction: this.fb.control(''),
            mileage: this.fb.control(''),
            fuelType: this.fb.control(''),
            power: this.fb.control(''),
            capacity: this.fb.control(''),
            doorCount: this.fb.control(''),
            bodyType: this.fb.control(''),
            gearboxType: this.fb.control(''),
            description: this.fb.control(''),
            price: this.fb.control(''),
        });
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
