import { Component, input } from '@angular/core';
import { HousingLocation } from '../housing-location';

@Component({
  selector: 'app-housing-location-summary',
  imports: [],
  template: `
    <section class="listing">
      <img
        class="listing-photo"
        [src]="housingLocation().photo"
        alt="Exterior photo of {{ housingLocation().name }}"
      />
      <h2 class="listing-heading">{{ housingLocation().name }}</h2>
      <p class="listing-location">
        {{ housingLocation().city }}, {{ housingLocation().state }}
      </p>
    </section>
  `,
  styleUrl: './housing-location-summary.component.scss',
})
export class HousingLocationSummaryComponent {
  readonly housingLocation = input.required<HousingLocation>();
}
