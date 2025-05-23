import { Component, inject, signal } from '@angular/core';

import { HousingLocationSummaryComponent } from '../feature-housing/housing-location-summary/housing-location-summary.component';
import { HousingService } from '../feature-housing/housing.service';

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
  private readonly housingService = inject(HousingService);
  readonly housingLocations = this.housingService.getAllHousingLocations();
}
