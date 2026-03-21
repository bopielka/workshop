import {Component, input} from '@angular/core';
import {outputFromObservable} from '@angular/core/rxjs-interop';
import {Subject} from 'rxjs';
import {debounceTime} from 'rxjs/operators';
import {NzIconDirective} from 'ng-zorro-antd/icon';
import {TranslateService} from '@ngx-translate/core';

@Component({
    selector: 'app-search-bar',
    imports: [NzIconDirective],
    templateUrl: './search-bar.html',
    styleUrl: './search-bar.scss',
})
export class SearchBarComponent {
    placeholder = input<string>('');

    private inputSubject = new Subject<string>();
    searchChange = outputFromObservable(this.inputSubject.pipe(debounceTime(500)));

    constructor(protected translateService: TranslateService) {}

    protected onInput(value: string): void {
        this.inputSubject.next(value);
    }
}
