import {ResolveFn} from '@angular/router';
import {inject} from '@angular/core';
import {CarHttpClient} from '@/app/api/car/car-http-client';
import {CarCardDto} from '@/app/domain/dto/CarCardDto';

export const homeResolver: ResolveFn<CarCardDto[]> = () => {
    return inject(CarHttpClient).getLatestCars();
};
