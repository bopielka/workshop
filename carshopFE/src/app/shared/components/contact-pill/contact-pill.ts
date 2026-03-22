import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { NzIconDirective } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-contact-pill',
  imports: [TranslatePipe, NzIconDirective],
  templateUrl: './contact-pill.html',
  styleUrl: './contact-pill.scss',
})
export class ContactPillComponent {}
