import {Component} from '@angular/core';
import {NzMenuDirective, NzMenuItemComponent} from "ng-zorro-antd/menu";
import {TranslatePipe} from "@ngx-translate/core";
import {Router, RouterLink} from "@angular/router";
import {NgOptimizedImage} from "@angular/common";
import {noop} from "rxjs";
import Keycloak from "keycloak-js";
import {NzHeaderComponent, NzLayoutComponent} from "ng-zorro-antd/layout";
import {NzSpaceComponent, NzSpaceItemDirective} from "ng-zorro-antd/space";
import {NzFlexDirective} from "ng-zorro-antd/flex";

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
        NzSpaceItemDirective
    ],
    templateUrl: './navbar-component.html',
    styleUrls: ['./navbar-component.scss']
})
export class NavbarComponent {

    constructor(private router: Router,
                private keycloak: Keycloak) {
    }

    navigateToHomePage(): void {
        this.router.navigate(['/']).then(noop);
    }

    protected isSelected(url: string) {
        return this.router.url.includes(url);
    }

    protected isManager(): boolean {
        if (!this.keycloak.authenticated) return false;

        const tp = this.keycloak.tokenParsed;
        if (!tp) return false;

        const realmRoles = tp.realm_access?.roles ?? [];

        return realmRoles.includes('manage-cars');
    }

    protected isLoggedIn(): boolean {
        return this.keycloak.authenticated === true;
    }

    logout() {
        this.keycloak.logout().then(noop);
    }
}
