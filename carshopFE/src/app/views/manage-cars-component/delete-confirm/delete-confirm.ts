import {Component, inject} from '@angular/core';
import {TranslatePipe} from '@ngx-translate/core';
import {NZ_MODAL_DATA, NzModalRef} from 'ng-zorro-antd/modal';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {NzIconDirective} from 'ng-zorro-antd/icon';
import {injectDeleteCarMutation} from '@/app/api/car/car-service';

@Component({
    selector: 'app-delete-confirm',
    standalone: true,
    imports: [NzButtonComponent, NzIconDirective, TranslatePipe],
    templateUrl: './delete-confirm.html',
    styleUrl: './delete-confirm.scss',
})
export class DeleteConfirmComponent {
    private modalRef = inject(NzModalRef);
    private data = inject<{id: number}>(NZ_MODAL_DATA);
    private deleteMutation = injectDeleteCarMutation();

    cancel(): void { this.modalRef.close(); }

    confirm(): void {
        this.deleteMutation.mutate(this.data.id);
        this.modalRef.close();
    }
}
