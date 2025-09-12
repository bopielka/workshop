import { Routes } from '@angular/router';
import {Test} from "./test/test/test";
import {HomeComponent} from "./components/home-component/home-component";
import {CarListComponent} from "./components/car-list-component/car-list-component";

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
        path: '**',
        redirectTo: 'home',
    },
];
