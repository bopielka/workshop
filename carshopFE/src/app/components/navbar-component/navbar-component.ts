import {Component} from '@angular/core';
import {NzFlexDirective} from "ng-zorro-antd/flex";
import {NzHeaderComponent, NzLayoutComponent} from "ng-zorro-antd/layout";
import {NzMenuDirective, NzMenuItemComponent} from "ng-zorro-antd/menu";
import {NzSpaceComponent, NzSpaceItemDirective} from "ng-zorro-antd/space";
import {TranslatePipe} from "@ngx-translate/core";
import {Router, RouterLink} from "@angular/router";
import {NgOptimizedImage} from "@angular/common";
import {noop} from "rxjs";

@Component({
  selector: 'app-navbar-component',
    imports: [
        NzFlexDirective,
        NzHeaderComponent,
        NzLayoutComponent,
        NzMenuDirective,
        NzMenuItemComponent,
        NzSpaceComponent,
        TranslatePipe,
        NzSpaceItemDirective,
        RouterLink,
        NgOptimizedImage
    ],
  templateUrl: './navbar-component.html',
  styleUrls: ['./navbar-component.scss', '../../../assets/global-styles.scss']
})
export class NavbarComponent {

    constructor(private router: Router) {
    }

    navigateToHomePage(): void {
        this.router.navigate(['/']).then(noop);
    }
}
