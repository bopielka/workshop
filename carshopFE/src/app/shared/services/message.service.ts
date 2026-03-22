import { inject, Injectable, signal, TemplateRef } from '@angular/core';
import { NzMessageRef, NzMessageService } from 'ng-zorro-antd/message';
import { TranslateService } from '@ngx-translate/core';

@Injectable({ providedIn: 'root' })
export class MessageService {
  readonly msgText = signal('');

  private nzMessage = inject(NzMessageService);
  private translate = inject(TranslateService);
  private msgRef: NzMessageRef | null = null;

  success(key: string, tpl: TemplateRef<void>): void {
    this.show('success', key, tpl);
  }

  error(key: string, tpl: TemplateRef<void>): void {
    this.show('error', key, tpl);
  }

  dismiss(): void {
    if (this.msgRef) this.nzMessage.remove(this.msgRef.messageId);
  }

  private show(type: 'success' | 'error', key: string, tpl: TemplateRef<void>): void {
    this.msgText.set(this.translate.instant(key));
    this.msgRef = this.nzMessage.create(type, tpl, { nzDuration: 5000 });
  }
}
