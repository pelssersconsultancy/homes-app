import { Component, computed, inject, input, Signal } from '@angular/core';
import { HousingService } from '../housing.service';
import { HousingLocation } from '../housing-location';

@Component({
  selector: 'app-housing-location-details',
  imports: [],
  template: `
    @if (housingLocation(); as housingLocation) {
    <div>Housing Location Details {{ id() }} found</div>
    } @else {
    <div>Housing Location {{ id() }} does not exist</div>
    }
  `,
  styleUrl: './housing-location-details.component.scss',
})
export class HousingLocationDetailsComponent {
  private readonly housingService = inject(HousingService);
  id = input.required<string>();
  housingLocation: Signal<HousingLocation | undefined>;

  constructor() {
    this.housingLocation = computed(() => {
      const id = this.id();

      return id === ''
        ? undefined
        : this.housingService.getHousingLocationById(+id)();
    });
  }
}
