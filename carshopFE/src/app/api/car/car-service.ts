import {inject} from '@angular/core';
import {injectMutation, injectQuery, QueryClient} from '@tanstack/angular-query-experimental';
import {CarHttpClient} from './car-http-client';
import {CarDto} from '@/app/domain/dto/CarDto';

export const CAR_QUERY_KEY = 'cars';

export const injectCarsQuery = () => {
    const api = inject(CarHttpClient);
    return injectQuery(() => ({
        queryKey: [CAR_QUERY_KEY],
        queryFn: () => api.getCars(),
    }));
};

export const injectCarsPageQuery = (page: () => number, size: number = 12, search: () => string = () => '') => {
    const api = inject(CarHttpClient);
    return injectQuery(() => ({
        queryKey: [CAR_QUERY_KEY, 'page', page(), size, search()],
        queryFn: () => api.getCarsPage(page(), size, search()),
    }));
};

export const injectCarsPageForManageQuery = (page: () => number, size: number = 12, search: () => string = () => '') => {
    const api = inject(CarHttpClient);
    return injectQuery(() => ({
        queryKey: [CAR_QUERY_KEY, 'manage', page(), size, search()],
        queryFn: () => api.getCarsPageForManage(page(), size, search()),
    }));
};

export const injectCarQuery = (id: () => number) => {
    const api = inject(CarHttpClient);
    return injectQuery(() => ({
        queryKey: [CAR_QUERY_KEY, id()],
        queryFn: () => api.getCarById(id()),
        enabled: !!id(),
    }));
};

export const injectCreateCarMutation = () => {
    const api = inject(CarHttpClient);
    const client = inject(QueryClient);
    return injectMutation(() => ({
        mutationFn: ({car, images}: { car: Omit<CarDto, 'id' | 'images'>; images: File[] }) =>
            api.createCar(car, images),
        onSuccess: () => client.invalidateQueries({queryKey: [CAR_QUERY_KEY]}),
    }));
};

export const injectUpdateCarMutation = () => {
    const api = inject(CarHttpClient);
    const client = inject(QueryClient);
    return injectMutation(() => ({
        mutationFn: ({id, car, keepImageIds, newImages}: {
            id: number;
            car: Omit<CarDto, 'id' | 'images'>;
            keepImageIds: number[];
            newImages: File[];
        }) => api.updateCar(id, car, keepImageIds, newImages),
        onSuccess: () => client.invalidateQueries({queryKey: [CAR_QUERY_KEY]}),
    }));
};

export const injectDeleteCarMutation = () => {
    const api = inject(CarHttpClient);
    const client = inject(QueryClient);
    return injectMutation(() => ({
        mutationFn: (id: number) => api.deleteCar(id),
        onSuccess: () => client.invalidateQueries({queryKey: [CAR_QUERY_KEY]}),
    }));
};
