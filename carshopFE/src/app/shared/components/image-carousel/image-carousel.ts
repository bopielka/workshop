import {Component, effect, EventEmitter, input, OnDestroy, Output, signal, ViewChild} from '@angular/core';
import {NzUploadFile} from "ng-zorro-antd/upload";
import {NzCarouselComponent, NzCarouselModule} from "ng-zorro-antd/carousel";

@Component({
    selector: 'app-image-carousel',
    imports: [NzCarouselModule],
    templateUrl: './image-carousel.html',
    styleUrl: './image-carousel.scss'
})
export class ImageCarouselComponent implements OnDestroy {
    fileList = input<NzUploadFile[]>([]);
    coverUid = input<string | null>(null);
    zoomable = input<boolean>(true);

    @Output() removeFile = new EventEmitter<string>();
    @Output() setCover = new EventEmitter<string>();
    @Output() imageClick = new EventEmitter<void>();

    @ViewChild(NzCarouselComponent) private nzCarousel!: NzCarouselComponent;

    protected previewUrls = new Map<string, string>();
    protected activeIndex = signal(0);
    private pendingNavigateTo: number | null = null;

    constructor() {
        effect(() => {
            const list = this.fileList();
            const incoming = new Set(list.map(f => f.uid));

            this.previewUrls.forEach((url, uid) => {
                if (!incoming.has(uid)) {
                    if (url.startsWith('blob:')) URL.revokeObjectURL(url);
                    this.previewUrls.delete(uid);
                }
            });

            for (const file of list) {
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
                const target = Math.min(this.pendingNavigateTo, list.length - 1);
                this.pendingNavigateTo = null;
                setTimeout(() => this.nzCarousel?.goTo(target), 0);
            }
        });
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
        const file = this.fileList()[this.currentIndex];
        return !!file && file.uid === this.coverUid();
    }

    removeCurrent(): void {
        const index = this.currentIndex;
        const file = this.fileList()[index];
        if (!file) return;
        this.pendingNavigateTo = index > 0 ? index - 1 : 0;
        this.removeFile.emit(file.uid);
    }

    setAsCover(): void {
        const file = this.fileList()[this.currentIndex];
        if (file) this.setCover.emit(file.uid);
    }

    protected prev(): void {
        const len = this.fileList().length;
        this.activeIndex.set((this.activeIndex() - 1 + len) % len);
        this.nzCarousel?.pre();
    }

    protected next(): void {
        const len = this.fileList().length;
        this.activeIndex.set((this.activeIndex() + 1) % len);
        this.nzCarousel?.next();
    }

    protected goTo(index: number): void {
        this.activeIndex.set(index);
        this.nzCarousel?.goTo(index);
    }

    protected onAfterChange(index: number): void {
        this.activeIndex.set(index);
    }
}
