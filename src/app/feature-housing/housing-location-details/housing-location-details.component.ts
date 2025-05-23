import { Component, input } from '@angular/core';

@Component({
  selector: 'app-housing-location-details',
  imports: [],
  template: `<div>Housing Location Details {{ id() }}</div>`,
  styleUrl: './housing-location-details.component.scss',
})
export class HousingLocationDetailsComponent {
  id = input.required<string>();
}
