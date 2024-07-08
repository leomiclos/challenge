import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CountryService } from '../../core/services/country.service';
import { CommonModule } from '@angular/common';
import { Country } from '../../models/country.model';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
  standalone: true,
  imports: [CommonModule],
  providers: [CountryService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DetailsComponent implements OnInit {

  country: Country | null = null;
  nativeNames: { common: string, official: string }[] = [];
  currencyName: string = '';
  currencySymbol: string = '';
  languages: string = '';
  borders: string[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private countryService: CountryService
  ) { }

  ngOnInit() {
    const countryName = this.route.snapshot.paramMap.get('name');
    this.getCountryDetails(String(countryName));
  }

  getCountryDetails(name: string | null) {
    if (name) {
      this.countryService.getCountriesByName(name).subscribe(
        (data: Country[]) => {
          if (data && data.length > 0) {
            this.country = data[0];

            // Verificações adicionais para garantir que os dados existem
            if (this.country.name && this.country.name.nativeName) {
              this.nativeNames = Object.values(this.country.name.nativeName);
            }


            const currencies = Object.values(this.country.currencies || {});
            if (currencies.length > 0 && typeof currencies[0] === 'object') {
              this.currencyName = (currencies[0] as any).name;
              this.currencySymbol = (currencies[0] as any).symbol;
            }

            this.languages = Object.values(this.country.languages || {}).join(', ');
            this.borders = this.country.borders || [];
          } else {
            console.error('Dados do país não encontrados');
            this.country = null;
          }
        },
        error => {
          console.error('Erro ao processar dados', error);
          this.country = null;
        }
      );
    } else {
      console.error('Nome do país é nulo ou indefinido');
      this.country = null;
    }
  }


  back() {
    this.router.navigate(['/home']);
  }
}
