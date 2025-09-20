import { Routes } from '@angular/router';
import {Test} from "./test/test/test";
import {HomeComponent} from "./components/home-component/home-component";
import {CarListComponent} from "./components/car-list-component/car-list-component";
import {LoginComponent} from "./components/login-component/login-component";
import {ManageCarsComponent} from "./components/manage-cars-component/manage-cars-component";
import {authGuard} from "./guard/auth-guard";
import {Role} from "./enums/Role";
import {AddCarComponent} from "./components/add-car-component/add-car-component";

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
        data: { role: Role.MANAGE_CARS }
    },
    {
        path: 'addCar',
        component: AddCarComponent,
        canActivate: [authGuard],
        data: { role: Role.MANAGE_CARS }
    },
    {
        path: '**',
        redirectTo: 'home',
    },
];
