import {
  Component,
  computed,
  inject,
  input,
  signal,
  Signal,
  viewChild,
} from '@angular/core';
import { HousingService } from '../housing.service';
import { HousingLocation } from '../housing-location';
import { FormsModule, NgForm } from '@angular/forms';
import { FormDirective } from '../../shared/form.directive';

@Component({
  selector: 'app-housing-location-details',
  imports: [FormsModule, FormDirective],
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
        @let application = applicationFormValue();
        <form
          #applicationForm="ngForm"
          (submit)="submitApplication()"
          (formValueChange)="onApplicationFormValueChange($event)"
        >
          <label for="first-name">First Name</label>
          <input
            id="first-name"
            name="firstName"
            type="text"
            [ngModel]="application.firstName"
            required
          />
          <label for="last-name">Last Name</label>
          <input
            id="last-name"
            name="lastName"
            type="text"
            [ngModel]="application.lastName"
            required
          />
          <label for="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            [ngModel]="application.email"
            required
          />
          <button type="submit" [disabled]="!applicationForm.valid">
            Submit Application
          </button>
        </form>
      </section>
      <section class="listing-ask-question">
        <h2 class="section-heading">Apply a question</h2>
        @let questionnaire = questionFormValue();
        <form
          #questionForm="ngForm"
          (submit)="submitQuestion()"
          (formValueChange)="onQuestionFormValueChange($event)"
        >
          <label for="question">Question</label>

          <textarea
            matInput
            id="question"
            name="question"
            [ngModel]="questionnaire.question"
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
  private readonly housingService = inject(HousingService);
  protected readonly applicationForm =
    viewChild.required<NgForm>('applicationForm');
  protected readonly questionForm = viewChild.required<NgForm>('questionForm');
  id = input.required<string>();

  protected readonly applicationFormValue = signal<ApplicationModel>({
    firstName: '',
    lastName: '',
    email: '',
  });

  protected readonly questionFormValue = signal<QuestionnaireModel>({
    question: '',
  });

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
    console.log('submitApplication', this.applicationFormValue());
  }

  submitQuestion() {
    console.log('questionFrm', this.questionForm());
    console.log('submitQuestion', this.questionFormValue());
  }

  onApplicationFormValueChange(value: ApplicationModel) {
    this.applicationFormValue.set(value);
  }

  onQuestionFormValueChange(value: QuestionnaireModel) {
    this.questionFormValue.set(value);
  }
}

export type ApplicationModel = {
  firstName: string;
  lastName: string;
  email: string;
};

export type QuestionnaireModel = {
  question: string;
};
