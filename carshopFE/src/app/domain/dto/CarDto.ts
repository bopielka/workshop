import {FuelType} from "@/app/domain/types/FuelType";
import {GearboxType} from "@/app/domain/types/GearboxType";
import {BodyType} from "@/app/domain/types/BodyType";
import {CarImageDto} from "@/app/domain/dto/CarImageDto";

export interface CarDto {
    id: string;
    model: string;
    make: string;
    yearOfProduction: number;
    mileage: number;
    fuelType: FuelType;
    power: number;
    capacity: number;
    doorCount: number;
    gearboxType: GearboxType;
    bodyType: BodyType;
    description: string;
    price: number;
    images: CarImageDto[];
}