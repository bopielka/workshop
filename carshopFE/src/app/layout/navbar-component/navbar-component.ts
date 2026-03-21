import {Component, inject} from '@angular/core';
import {NzMenuDirective, NzMenuItemComponent} from "ng-zorro-antd/menu";
import {TranslatePipe, TranslateService} from "@ngx-translate/core";
import {Router, RouterLink} from "@angular/router";
import {NgOptimizedImage} from "@angular/common";
import {noop} from "rxjs";
import {NzHeaderComponent, NzLayoutComponent} from "ng-zorro-antd/layout";
import {NzSpaceComponent, NzSpaceItemDirective} from "ng-zorro-antd/space";
import {NzFlexDirective} from "ng-zorro-antd/flex";
import {NzIconDirective} from "ng-zorro-antd/icon";
import {NzTooltipDirective} from "ng-zorro-antd/tooltip";
import {AuthService} from "@/app/shared/services/auth.service";
import {Role} from "@/app/domain/enums/Role";

@Component({
    selector: 'app-navbar-component',
    imports: [
        NzMenuDirective,
        NzMenuItemComponent,
        TranslatePipe,
        RouterLink,
        NgOptimizedImage,
        NzLayoutComponent,
        NzHeaderComponent,
        NzSpaceComponent,
        NzFlexDirective,
        NzSpaceItemDirective,
        NzIconDirective,
        NzTooltipDirective,
    ],
    templateUrl: './navbar-component.html',
    styleUrls: ['./navbar-component.scss']
})
export class NavbarComponent {

    protected menuOpen = false;

    protected authService = inject(AuthService);

    constructor(private router: Router,
                protected translate: TranslateService) {
    }

    protected get otherLang(): string {
        return this.translate.currentLang === 'pl' ? 'English' : 'Polski';
    }

    protected get langTooltip(): string {
        return this.translate.currentLang === 'pl' ? 'Zmień język' : 'Switch language';
    }

    protected toggleLang(): void {
        this.translate.use(this.translate.currentLang === 'pl' ? 'en' : 'pl');
    }

    navigateToHomePage(): void {
        this.router.navigate(['/']).then(noop);
    }

    protected isSelected(url: string) {
        return this.router.url === url || this.router.url.startsWith(url + '?');
    }

    protected isManager(): boolean {
        return this.authService.hasRole(Role.MANAGE_CARS);
    }

    protected isLoggedIn(): boolean {
        return this.authService.isLoggedIn;
    }

    logout() {
        this.authService.logout().then(noop);
    }
}
