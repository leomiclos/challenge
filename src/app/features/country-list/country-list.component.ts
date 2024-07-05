import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CountryService } from '../../core/services/country.service';
import { SharedService } from '../../core/services/shared.service';
import { CommonModule } from '@angular/common';

interface Country {
  name: { common: string };
  capital: string[];
  population: number;
  flags: { svg: string, png: string };
  region: string;
}

@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.component.html',
  standalone: true,
  imports: [CommonModule],
  styleUrls: ['./country-list.component.css'],
})
export class CountryListComponent implements OnInit {
  countries: Country[] = [];
  filteredCountries: Country[] = [];

  selectedRegionSubscription: Subscription | undefined;
  countryByNameSubscription: Subscription | undefined

  constructor(
    private countryService: CountryService,
    private sharedService: SharedService
  ) {}

  ngOnInit() {
    this.getCountriesInfo();
    this.subscribeToRegionChanges();
    this.subscribeToCountryNameChanges();
  }

  getCountriesInfo() {
    this.countryService.getCountries().subscribe((data: any) => {
      this.countries = data;
      this.countries.sort((a: Country, b: Country) => a.name.common.localeCompare(b.name.common));
      this.filterCountriesByRegion(undefined); // Mostra todos os países inicialmente
    });
  }

  subscribeToRegionChanges() {
    this.selectedRegionSubscription = this.sharedService.selectedRegion$.subscribe((region) => {
      this.filterCountriesByRegion(region);
    });
  }

  subscribeToCountryNameChanges() {
    this.selectedRegionSubscription = this.sharedService.searchedName$.subscribe((name) => {
      this.filterCountriesByName(name);
    });
  }

  filterCountriesByRegion(region: string | undefined) {
    if (region) {
      this.filteredCountries = this.countries.filter((country) => country.region === region);
    } else {
      this.filteredCountries = [...this.countries]; // Mostra todos se a região não estiver definida
    }
  }

  filterCountriesByName(name: string | undefined) {
    console.log(name);

    if (name) {
      this.countryService.getCountriesByName(name).subscribe((data: any[]) => {
        this.filteredCountries = data;
        console.log('Países filtrados por nome:', this.filteredCountries);
      });
    } else {
      this.filteredCountries = [...this.countries]; // Mostra todos se o nome não estiver definido
    }
  }
}
