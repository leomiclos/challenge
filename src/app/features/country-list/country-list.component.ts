import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CountryService } from '../../core/services/country.service';
import { SharedService } from '../../core/services/shared.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FilterByRegionComponent } from '../filter-by-region/filter-by-region.component';
import { InputGroupModule } from 'primeng/inputgroup';
import { Router } from '@angular/router';
import { Country } from '../../models/country.model';



@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule, FilterByRegionComponent, InputGroupModule],
  styleUrls: ['./country-list.component.css'],
  providers: [ CountryService, SharedService]
})
export class CountryListComponent implements OnInit, OnDestroy {


  countries: Country[] = [];
  filteredCountries: Country[] = [];
  searchTerm: string = '';

  selectedRegionSubscription: Subscription | undefined;
  countryByNameSubscription: Subscription | undefined;

  constructor(
    private countryService: CountryService,
    private sharedService: SharedService,
    private router: Router

  ) {}

  ngOnInit() {
    this.getCountriesInfo();
    this.subscribeToRegionChanges();
    this.subscribeToCountryNameChanges();
  }

  ngOnDestroy() {
    if (this.selectedRegionSubscription) {
      this.selectedRegionSubscription.unsubscribe();
    }
    if (this.countryByNameSubscription) {
      this.countryByNameSubscription.unsubscribe();
    }
  }

  getCountriesInfo() {
    this.countryService.getCountries().subscribe((data: any) => {
      this.countries = data;
      this.countries.sort((a: Country, b: Country) => a.name.common.localeCompare(b.name.common));
      this.filterCountriesByRegion(undefined); 
    });
  }

  subscribeToRegionChanges() {
    this.selectedRegionSubscription = this.sharedService.selectedRegion$.subscribe((region) => {
      this.filterCountriesByRegion(region);
    });
  }

  subscribeToCountryNameChanges() {
    this.countryByNameSubscription = this.sharedService.searchedName$.subscribe((name) => {
      this.filterCountriesByName(name);
    });
  }

  filterCountriesByRegion(region: string | undefined) {
    if (region) {
      this.filteredCountries = this.countries.filter((country) => country.region === region);
    } else {
      this.filteredCountries = [...this.countries];
    }
  }

  filterCountriesByName(name: string | undefined) {
    if (name) {
      this.filteredCountries = this.countries.filter((country) =>
        country.name.common.toLowerCase().includes(name.toLowerCase())
      );
    } else {
      this.filteredCountries = [...this.countries];
    }
  }

  viewCountryDetails(countryName: string) {
    this.router.navigate(['/details', countryName]); 
  }
}
