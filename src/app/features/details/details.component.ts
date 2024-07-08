import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CountryService } from '../../core/services/country.service';
import { CommonModule } from '@angular/common';
import { Country } from '../../models/country.model';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
  standalone: true,
  imports: [CommonModule],
  providers: [CountryService]
})
export class DetailsComponent implements OnInit {

  country!: Country | null;
  name: string = ''

  constructor(
    private route: ActivatedRoute,
    private countryService: CountryService
  ) { }

  ngOnInit() {
    const countryName = this.route.snapshot.paramMap.get('name');
    this.getCountryDetails(countryName);
  }

  getCountryDetails(name: string | null) {
    if (name) {
      this.countryService.getCountriesByName(name).subscribe((data: any) => {
          console.log(data[0]);
          
          
          if (data && data.length > 0) {
            this.country = data[0]
            this.name = data[0].common
          } else {
            console.error('No country data found');
            this.country = null;
          }
        },
        error => {
          console.error('Error fetching country details', error);
          this.country = null;
        }
      );
    } else {
      console.error('Country name is null');
      this.country = null;
    }
  }
}
