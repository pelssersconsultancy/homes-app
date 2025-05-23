import { computed, Injectable, Signal, signal } from '@angular/core';
import { housingLocationList } from './housing-location-list';
import { HousingLocation } from './housing-location';

@Injectable({
  providedIn: 'root',
})
export class HousingService {
  protected housingLocations = signal(housingLocationList).asReadonly();

  constructor() {}

  getAllHousingLocations(): Signal<HousingLocation[]> {
    return this.housingLocations;
  }

  getHousingLocationById(id: number): Signal<HousingLocation | undefined> {
    return computed(() => {
      const house = this.housingLocations().find(
        (location) => location.id === id
      );

      console.log(`Service housing location found: ${house}`);

      return house;
    });
  }
}
