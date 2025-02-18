import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { CountryListComponent } from '../country-list/country-list.component';
import { FilterByRegionComponent } from '../filter-by-region/filter-by-region.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CountryListComponent, FilterByRegionComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
