import { Component, inject, input } from '@angular/core';
import { Router } from '@angular/router';
import { CarCardDto } from '@/app/domain/dto/CarCardDto';
import { CurrencyPipe, DecimalPipe } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-car-card-component',
  imports: [CurrencyPipe, DecimalPipe, TranslatePipe],
  templateUrl: './car-card-component.html',
  styleUrls: ['./car-card-component.css'],
})
export class CarCardComponent {
  car = input.required<CarCardDto>();

  private router = inject(Router);

  get imageUrl(): string {
    return `/api/cars/images/${this.car().mainImage.id}`;
  }

  navigate(): void {
    this.router.navigate(['/cars', this.car().id]);
  }
}
