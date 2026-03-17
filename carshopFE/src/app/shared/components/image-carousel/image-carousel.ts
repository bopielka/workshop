import {Component, EventEmitter, Input, OnChanges, OnDestroy, Output, ViewChild} from '@angular/core';
import {NzUploadFile} from "ng-zorro-antd/upload";
import {NzCarouselComponent, NzCarouselModule} from "ng-zorro-antd/carousel";

@Component({
    selector: 'app-image-carousel',
    imports: [NzCarouselModule],
    templateUrl: './image-carousel.html',
    styleUrl: './image-carousel.scss'
})
export class ImageCarouselComponent implements OnChanges, OnDestroy {
    @Input() fileList: NzUploadFile[] = [];
    @Input() coverUid: string | null = null;
    @Output() removeFile = new EventEmitter<string>();
    @Output() setCover = new EventEmitter<string>();

    @ViewChild(NzCarouselComponent) private nzCarousel!: NzCarouselComponent;

    protected previewUrls = new Map<string, string>();
    private pendingNavigateTo: number | null = null;

    ngOnChanges(): void {
        const incoming = new Set(this.fileList.map(f => f.uid));

        this.previewUrls.forEach((url, uid) => {
            if (!incoming.has(uid)) {
                if (url.startsWith('blob:')) URL.revokeObjectURL(url);
                this.previewUrls.delete(uid);
            }
        });

        for (const file of this.fileList) {
            if (this.previewUrls.has(file.uid)) continue;
            if (file.thumbUrl) {
                this.previewUrls.set(file.uid, file.thumbUrl);
            } else if (file.url) {
                this.previewUrls.set(file.uid, file.url);
            } else if (file.originFileObj) {
                this.previewUrls.set(file.uid, URL.createObjectURL(file.originFileObj));
            }
        }

        if (this.pendingNavigateTo !== null) {
            const target = Math.min(this.pendingNavigateTo, this.fileList.length - 1);
            this.pendingNavigateTo = null;
            setTimeout(() => this.nzCarousel?.goTo(target), 0);
        }
    }

    ngOnDestroy(): void {
        this.previewUrls.forEach(url => {
            if (url.startsWith('blob:')) URL.revokeObjectURL(url);
        });
    }

    private get currentIndex(): number {
        return this.nzCarousel?.activeIndex ?? 0;
    }

    get isCurrentMain(): boolean {
        const file = this.fileList[this.currentIndex];
        return !!file && file.uid === this.coverUid;
    }

    removeCurrent(): void {
        const index = this.currentIndex;
        const file = this.fileList[index];
        if (!file) return;
        this.pendingNavigateTo = index > 0 ? index - 1 : 0;
        this.removeFile.emit(file.uid);
    }

    setAsCover(): void {
        const file = this.fileList[this.currentIndex];
        if (file) this.setCover.emit(file.uid);
    }
}
