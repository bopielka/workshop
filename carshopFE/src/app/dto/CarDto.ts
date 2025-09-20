import {FuelType} from "../types/FuelType";
import {GearboxType} from "../types/GearboxType";
import {BodyType} from "../types/BodyType";

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
}