import {CarDto} from "./CarDto";

export type ImageContentType = 'image/png' | 'image/jpeg';

export interface CarImageDto {
    id: string;
    filename: string;
    contentType: ImageContentType;
    size: number;
    position: number;
}

export interface CarImageWithRelations extends CarImageDto {
    car: CarDto;
    data: string;
}