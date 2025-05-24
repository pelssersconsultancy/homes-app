import {
  Component,
  computed,
  inject,
  input,
  Signal,
  viewChild,
  ViewChild,
} from '@angular/core';
import { HousingService } from '../housing.service';
import { HousingLocation } from '../housing-location';
import { FormControl, FormGroup, FormsModule, NgForm } from '@angular/forms';
import { first } from 'rxjs';

@Component({
  selector: 'app-housing-location-details',
  imports: [FormsModule],
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
        <form #applicationForm="ngForm" (submit)="submitApplication()">
          <label for="first-name">First Name</label>
          <input
            id="first-name"
            name="firstName"
            type="text"
            [(ngModel)]="applicationFormValue.firstName"
            required
          />
          <label for="last-name">Last Name</label>
          <input
            id="last-name"
            name="lastName"
            type="text"
            [(ngModel)]="applicationFormValue.lastName"
            required
          />
          <label for="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            [(ngModel)]="applicationFormValue.email"
            required
          />
          <button type="submit" [disabled]="!applicationForm.valid">
            Submit Application
          </button>
        </form>
      </section>
      <section class="listing-ask-question">
        <h2 class="section-heading">Apply a question</h2>
        <form #questionForm="ngForm" (submit)="submitQuestion()">
          <label for="question">Question</label>

          <textarea
            matInput
            id="question"
            name="question"
            [(ngModel)]="questionFormValue.question"
            required="true"
          ></textarea>
          <button type="submit" [disabled]="!questionForm.valid">
            Submit Question
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
  protected readonly applicationForm = viewChild.required('applicationForm');
  protected readonly questionForm = viewChild.required('questionForm');

  protected readonly applicationFormValue = {
    firstName: '',
    lastName: '',
    email: '',
  };

  protected readonly questionFormValue = {
    question: '',
  };

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

  submitApplication() {
    console.log('applicationForm', this.applicationForm());
    console.log('submitApplication', this.applicationFormValue);
  }

  submitQuestion() {
    console.log('questionFrm', this.questionForm());
    console.log('submitQuestion', this.questionFormValue);
  }
}
