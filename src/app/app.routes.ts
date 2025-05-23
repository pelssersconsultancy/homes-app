import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { HousingLocationDetailsComponent } from './feature-housing/housing-location-details/housing-location-details.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'Home Page' },
  {
    path: 'details/:id',
    component: HousingLocationDetailsComponent,
    title: 'Housing Location Details',
  },
];
