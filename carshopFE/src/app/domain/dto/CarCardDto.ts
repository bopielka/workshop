import {CarImageDto} from "@/app/domain/dto/CarImageDto";

export interface CarCardDto {
    id: string;
    model: string;
    make: string;
    yearOfProduction: number;
    mileage: number;
    price: number;
    isDraft: boolean;
    mainImage: CarImageDto;
}
