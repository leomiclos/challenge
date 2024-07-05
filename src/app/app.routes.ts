import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { DetailsComponent } from './features/details/details.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home',
    component: HomeComponent,
    children: [
      { path: 'details', component: DetailsComponent}
    ]
  }
];
