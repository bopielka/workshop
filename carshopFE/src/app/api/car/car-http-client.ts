import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {firstValueFrom} from 'rxjs';
import {CarDto} from '@/app/domain/dto/CarDto';
import {CarCardDto} from '@/app/domain/dto/CarCardDto';
import {PaginatedResponse} from '@/app/domain/dto/PaginatedResponse';

const BASE = '/api/cars';

@Injectable({providedIn: 'root'})
export class CarHttpClient {
    private http = inject(HttpClient);

    async getCars(): Promise<CarDto[]> {
        const r = await firstValueFrom(this.http.get<PaginatedResponse<CarDto>>(BASE));
        return r.resources;
    }

    async getCarsPage(page: number, size: number = 12, search: string = ''): Promise<PaginatedResponse<CarCardDto>> {
        const params: Record<string, string | number> = {page, size};
        if (search) params['search'] = search;
        const r = await firstValueFrom(
            this.http.get<PaginatedResponse<CarDto>>(BASE, {params})
        );
        return this.mapToCardDtoPage(r);
    }

    async getCarsPageForManage(page: number, size: number = 12, search: string = ''): Promise<PaginatedResponse<CarCardDto>> {
        const params: Record<string, string | number> = {page, size};
        if (search) params['search'] = search;
        const r = await firstValueFrom(
            this.http.get<PaginatedResponse<CarDto>>(`${BASE}/manage`, {params})
        );
        return this.mapToCardDtoPage(r);
    }

    private mapToCardDtoPage(r: PaginatedResponse<CarDto>): PaginatedResponse<CarCardDto> {
        return {
            ...r,
            resources: r.resources
                .filter(car => car.images.length > 0)
                .map(car => ({
                    id: car.id,
                    model: car.model,
                    make: car.make,
                    yearOfProduction: car.yearOfProduction,
                    mileage: car.mileage,
                    price: car.price,
                    isDraft: car.isDraft,
                    mainImage: car.images.find(img => img.isMain) ?? car.images[0],
                })),
        };
    }

    async getCarById(id: number): Promise<CarDto> {
        return firstValueFrom(this.http.get<CarDto>(`${BASE}/${id}`));
    }

    async createCar(car: Omit<CarDto, 'id' | 'images'>, images: File[]): Promise<CarDto> {
        const form = new FormData();
        form.append('car', new Blob([JSON.stringify(car)], {type: 'application/json'}));
        images.forEach(file => form.append('images', file));
        return firstValueFrom(this.http.post<CarDto>(BASE, form));
    }

    async updateCar(id: number, car: Omit<CarDto, 'id' | 'images'>, keepImageIds: number[], newImages: File[]): Promise<CarDto> {
        const form = new FormData();
        form.append('car', new Blob([JSON.stringify(car)], {type: 'application/json'}));
        if (keepImageIds.length > 0) {
            form.append('keepImageIds', keepImageIds.join(','));
        }
        newImages.forEach(file => form.append('newImages', file));
        return firstValueFrom(this.http.put<CarDto>(`${BASE}/${id}`, form));
    }

    async deleteCar(id: number): Promise<void> {
        return firstValueFrom(this.http.delete<void>(`${BASE}/${id}`));
    }

    async getLatestCars(): Promise<CarCardDto[]> {
        const cars = await firstValueFrom(this.http.get<CarDto[]>(`${BASE}/latest`));
        return cars
            .filter(car => car.images.length > 0)
            .map(car => ({
                id: car.id,
                model: car.model,
                make: car.make,
                yearOfProduction: car.yearOfProduction,
                mileage: car.mileage,
                price: car.price,
                isDraft: car.isDraft,
                mainImage: car.images.find(img => img.isMain) ?? car.images[0],
            }));
    }
}
