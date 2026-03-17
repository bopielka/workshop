import {Routes} from '@angular/router';
import {Test} from "@/app/views/test/test";
import {HomeComponent} from "@/app/views/home/home-component/home-component";
import {CarListComponent} from "@/app/shared/components/car-list-component/car-list-component";
import {LoginComponent} from "@/app/shared/components/login-component/login-component";
import {ManageCarsComponent} from "@/app/shared/components/manage-cars-component/manage-cars-component";
import {authGuard} from "@/app/guard/auth-guard";
import {Role} from "@/app/domain/enums/Role";
import {AddCarComponent} from "@/app/views/add-car-component/add-car-component";

export const routes: Routes = [
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'cars',
        component: CarListComponent
    },
    {
        path: 'test',
        component: Test
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'manage-cars',
        component: ManageCarsComponent,
        canActivate: [authGuard],
        data: {role: Role.MANAGE_CARS}
    },
    {
        path: 'addCar',
        component: AddCarComponent,
        canActivate: [authGuard],
        data: {role: Role.MANAGE_CARS}
    },
    {
        path: '**',
        redirectTo: 'home',
    },
];
