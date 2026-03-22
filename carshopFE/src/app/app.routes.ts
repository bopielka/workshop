import { Routes } from '@angular/router';
import { HomeComponent } from '@/app/views/home-component/home-component';
import { homeResolver } from '@/app/views/home-component/home.resolver';
import { CarListComponent } from '@/app/views/car-list-component/car-list-component';
import { ViewCarComponent } from '@/app/views/view-car-component/view-car-component';
import { LoginComponent } from '@/app/shared/components/login-component/login-component';
import { ManageCarsComponent } from '@/app/views/manage-cars-component/manage-cars-component';
import { authGuard } from '@/app/guard/auth-guard';
import { Role } from '@/app/domain/enums/Role';
import { AddCarComponent } from '@/app/views/add-car-component/add-car-component';

export const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    resolve: { cars: homeResolver },
  },
  {
    path: 'cars',
    component: CarListComponent,
  },
  {
    path: 'cars/:id',
    component: ViewCarComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'manage-cars',
    component: ManageCarsComponent,
    canActivate: [authGuard],
    data: { role: Role.MANAGE_CARS },
  },
  {
    path: 'addCar',
    component: AddCarComponent,
    canActivate: [authGuard],
    data: { role: Role.MANAGE_CARS },
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];
