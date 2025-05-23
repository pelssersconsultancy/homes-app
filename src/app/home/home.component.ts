import { Component, input, signal } from '@angular/core';

import { HousingLocation } from '../feature-housing/housing-location';
import { HousingLocationSummaryComponent } from '../feature-housing/housing-location-summary/housing-location-summary.component';
import { housingLocationList } from './housing-location-list';

@Component({
  selector: 'app-home',
  imports: [HousingLocationSummaryComponent],
  template: `
    <section>
      <form>
        <input type="text" placeholder="Filter by city" />
        <button class="primary" type="button">Search</button>
      </form>
    </section>
    <section class="results">
      @for (housingLocation of housingLocations(); track housingLocation.id) {
      <app-housing-location-summary
        [housingLocation]="housingLocation"
      ></app-housing-location-summary>
      }
    </section>
  `,
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  readonly housingLocations = signal(housingLocationList);
}
