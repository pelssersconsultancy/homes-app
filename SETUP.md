# Angular quick start

See https://github.com/angular/codelabs/tree/homes-app-start

1. Install latest node version
2. Install angular CLI

   `$ npm install -g @angular/cli`

   `$ ng version`

3. Create a new angular app called homes-app

   `$ ng new homes-app`

4. Inside the homes-app folder run the serve command

   `$ ng serve`

5. Place static files in the public folder (e.g. create an assets folder with logo.svg inside public folder)

   `<img class="brand-logo" src="assets/logo.svg" alt="logo"/>`

6. Generate a Home component

   `$ ng g c Home --inline-template` (shortcut version)

   `$ ng generate component Home --inline-template`
