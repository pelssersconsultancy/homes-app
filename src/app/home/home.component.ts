import { Component, input } from '@angular/core';

import { HousingLocation } from '../feature-housing/housing-location';
import { HousingLocationSummaryComponent } from '../feature-housing/housing-location-summary/housing-location-summary.component';

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
      @for (housingLocation of housingLocationList(); track housingLocation.id)
      {
      <app-housing-location-summary
        [housingLocation]="housingLocation"
      ></app-housing-location-summary>
      }
    </section>
  `,
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  readonly housingLocationList = input.required<HousingLocation[]>();
}
