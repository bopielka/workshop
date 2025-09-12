import {Component, OnInit, signal} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
    selector: 'app-test',
    imports: [],
    templateUrl: './test.html',
    styleUrl: './test.css'
})
export class Test implements OnInit {
    message = signal<string>('');

    constructor(private http: HttpClient) {
    }

    ngOnInit(): void {
        this.http
            .get('/api/test', {responseType: 'text' as const})
            .subscribe(v => this.message.set(v));
    }
}