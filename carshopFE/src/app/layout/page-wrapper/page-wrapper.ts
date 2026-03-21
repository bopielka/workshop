import {Component, input} from '@angular/core';

@Component({
    selector: 'app-page-wrapper',
    imports: [],
    templateUrl: './page-wrapper.html',
    styleUrl: './page-wrapper.scss'
})
export class PageWrapperComponent {
    title = input('');
}
