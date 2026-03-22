import { Component, inject, model, OnInit } from '@angular/core';
import {
  ControlContainer,
  FormGroup,
  FormGroupDirective,
  ReactiveFormsModule,
} from '@angular/forms';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { NzUploadComponent, NzUploadFile } from 'ng-zorro-antd/upload';
import {
  NzFormControlComponent,
  NzFormItemComponent,
  NzFormLabelComponent,
} from 'ng-zorro-antd/form';
import { NzInputDirective, NzInputWrapperComponent } from 'ng-zorro-antd/input';
import { NzIconDirective } from 'ng-zorro-antd/icon';
import { NzOptionComponent, NzSelectComponent } from 'ng-zorro-antd/select';
import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { ImageCarouselComponent } from '@/app/shared/components/image-carousel/image-carousel';
import { fuelTypes } from '@/app/domain/types/FuelType';
import { gearboxTypes } from '@/app/domain/types/GearboxType';
import { BodyType, bodyTypes } from '@/app/domain/types/BodyType';
import { getBase64 } from '@/app/shared/utils/file-utils';
import { CAR_MAKES, CAR_MODELS } from '@/app/domain/data/car-models';

@Component({
  selector: 'app-car-form-fields',
  imports: [
    ReactiveFormsModule,
    NzFormItemComponent,
    NzFormLabelComponent,
    NzFormControlComponent,
    NzInputDirective,
    NzInputWrapperComponent,
    NzUploadComponent,
    NzIconDirective,
    NzSelectComponent,
    NzOptionComponent,
    NzAutocompleteModule,
    NzModalModule,
    NzButtonComponent,
    TranslatePipe,
    ImageCarouselComponent,
  ],
  templateUrl: './car-form-fields.html',
  styleUrl: './car-form-fields.scss',
  viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }],
})
export class CarFormFieldsComponent implements OnInit {
  fileList = model.required<NzUploadFile[]>();
  coverUid = model<string | null>(null);

  protected fuelTypes = fuelTypes;
  protected gearboxTypes = gearboxTypes;
  protected previewImage: string | undefined = '';
  protected previewVisible = false;

  protected modelSuggestions: string[] = [];
  protected makeSuggestions: string[] = [];
  private availableModelsForMake: string[] = [];

  private cc = inject(ControlContainer);

  constructor(protected translateService: TranslateService) {}

  ngOnInit(): void {
    const fg = this.cc.control as FormGroup;
    fg.get('model')!.valueChanges.subscribe((value: string | null) => {
      this.updateAvailableModels(value ?? '');
    });
  }

  private updateAvailableModels(brand: string): void {
    this.availableModelsForMake = CAR_MODELS[brand.toLowerCase().trim()] ?? [];
    this.makeSuggestions = [...this.availableModelsForMake];
  }

  protected onModelInput(value: string): void {
    const v = value.toLowerCase();
    this.modelSuggestions = v ? CAR_MAKES.filter((m) => m.toLowerCase().includes(v)) : [];
    this.updateAvailableModels(value);
  }

  protected onMakeInput(value: string): void {
    if (!this.availableModelsForMake.length) return;
    const v = value.toLowerCase();
    this.makeSuggestions = v
      ? this.availableModelsForMake.filter((m) => m.toLowerCase().includes(v))
      : [...this.availableModelsForMake];
  }

  protected get sortedBodyTypes(): BodyType[] {
    return [...bodyTypes].sort((a, b) =>
      this.translateService.instant(a).localeCompare(this.translateService.instant(b)),
    );
  }

  beforeUpload = (file: NzUploadFile): boolean => {
    const rawFile = file as unknown as File;
    this.fileList.update((list) => [
      ...list,
      {
        uid: file.uid,
        name: rawFile.name,
        size: rawFile.size,
        type: rawFile.type,
        originFileObj: rawFile,
        status: 'done' as const,
        percent: 100,
      },
    ]);
    return false;
  };

  onRemoveFile(uid: string): void {
    this.fileList.update((list) => list.filter((f) => f.uid !== uid));
    if (this.coverUid() === uid) this.coverUid.set(null);
  }

  onSetCover(uid: string): void {
    this.coverUid.set(uid);
  }

  handlePreview = async (file: NzUploadFile): Promise<void> => {
    if (!file.url && !file['preview']) {
      file['preview'] = await getBase64(file.originFileObj!);
    }
    this.previewImage = file.url || file['preview'];
    this.previewVisible = true;
  };
}
