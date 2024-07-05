import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CountryService } from '../../core/services/country.service';
import { SharedService } from '../../core/services/shared.service';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';

interface Country {
  name: { common: string };
  capital: string[];
  population: number;
  flags: { svg: string; png: string };
  region: string;
}

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css'],
  standalone: true,
  providers: [CountryService, SharedService],
  imports: [IconFieldModule, InputIconModule, InputTextModule, FormsModule],
})
export class FilterComponent implements OnInit, OnDestroy {
  value: string = '';
  countries: Country[] = [];
  searchedNameSubscription: Subscription | undefined;

  constructor(
    private countryService: CountryService,
    private sharedService: SharedService
  ) {}

  ngOnInit() {
    this.subscribeToSearchedNameChanges();
  }

  ngOnDestroy() {
    if (this.searchedNameSubscription) {
      this.searchedNameSubscription.unsubscribe();
    }
  }

  subscribeToSearchedNameChanges() {
    this.searchedNameSubscription = this.sharedService.searchedName$.subscribe((name) => {
      if (name && name.trim().length > 0) {
        this.countryService.getCountriesByName(name).subscribe((data: any[]) => {
          this.countries = data;
          console.log('Países filtrados por nome:', this.countries);
        });
      } else {
        this.countries = []; // Limpar a lista se a busca estiver vazia
        console.log('Nenhum país encontrado.');
      }
    });
  }

  getByName(value: string) {
    this.sharedService.setSearchedName(value);
  }
}
