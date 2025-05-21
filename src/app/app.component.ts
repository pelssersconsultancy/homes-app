import { Component } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { housingLocationList } from './home/housing-location-list';

@Component({
  selector: 'app-root',

  template: `
    <main>
      <header class="brand-name">
        <img
          class="brand-logo"
          src="assets/logo.svg"
          alt="logo"
          aria-hidden="true"
        />
      </header>
      <section class="content">
        <app-home [housingLocationList]="housingLocationList"></app-home>
      </section>
    </main>
  `,
  styleUrl: './app.component.scss',
  imports: [HomeComponent],
})
export class AppComponent {
  title = 'homes-app';
  housingLocationList = housingLocationList;
}
