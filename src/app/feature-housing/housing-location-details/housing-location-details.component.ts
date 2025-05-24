import { Component, computed, inject, input, Signal } from '@angular/core';
import { HousingService } from '../housing.service';
import { HousingLocation } from '../housing-location';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-housing-location-details',
  imports: [ReactiveFormsModule],
  template: `
    @if (housingLocation(); as housingLocation) {
    <article>
      <img
        class="listing-photo"
        [src]="housingLocation.photo"
        alt="Exterior photo of {{ housingLocation.name }}"
      />
      <section class="listing-description">
        <h2 class="listing-heading">{{ housingLocation.name }}</h2>
        <p class="listing-location">
          {{ housingLocation.city }}, {{ housingLocation.state }}
        </p>
      </section>
      <section class="listing-features">
        <h2 class="section-heading">About this housing location</h2>
        <ul>
          <li>Units available: {{ housingLocation.availableUnits }}</li>
          <li>Wifi available: {{ housingLocation.wifi }}</li>
          <li>Laundry available: {{ housingLocation.laundry }}</li>
        </ul>
      </section>
      <section class="listing-apply">
        <h2 class="section-heading">Apply for this housing location</h2>
        <form [formGroup]="applyForm" (submit)="submitApplication()">
          <label for="first-name">First Name</label>
          <input
            id="first-name"
            type="text"
            formControlName="firstName"
            required
          />
          <label for="last-name">Last Name</label>
          <input
            id="last-name"
            type="text"
            formControlName="lastName"
            required
          />
          <label for="email">Email</label>
          <input id="email" type="email" formControlName="email" required />
          <button type="submit" [disabled]="applyForm.invalid">
            Submit Application
          </button>
        </form>
      </section>
    </article>

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

  applyForm = new FormGroup({
    firstName: new FormControl('', { nonNullable: true }),
    lastName: new FormControl('', { nonNullable: true }),
    email: new FormControl('', { nonNullable: true }),
  });

  constructor() {
    this.housingLocation = computed(() => {
      const id = this.id();

      return id === ''
        ? undefined
        : this.housingService.getHousingLocationById(+id)();
    });
  }

  submitApplication() {
    // https://angular.dev/guide/forms/typed-forms
    // value is non nullable but can still be undefined because any control can be disabled
    this.housingService.submitApplication(
      this.applyForm.value.firstName ?? '',
      this.applyForm.value.lastName ?? '',
      this.applyForm.value.email ?? ''
    );
  }
}
