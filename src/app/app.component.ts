import { Component } from '@angular/core';

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
    </main>
  `,
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'homes-app';
}
