import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { CountryService } from '../../core/services/country.service';
import { SharedService } from '../../core/services/shared.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-filter-by-region',
  templateUrl: './filter-by-region.component.html',
  styleUrls: ['./filter-by-region.component.css'],
  standalone: true,
  imports: [FormsModule, DropdownModule, CommonModule, ReactiveFormsModule]
})
export class FilterByRegionComponent implements OnInit {
  selectedRegion: string | undefined;
  region: { name: string }[] = [];

  constructor(
    private countryService: CountryService,
    private sharedService: SharedService
  ) {}

  ngOnInit() {
    this.getRegion();
  }

  getRegion() {
    this.countryService.getRegions().subscribe((data: string[]) => {
      this.region = data.map(region => ({ name: region }));
    });
  }

  onRegionChange(event: any) {
    console.log(event.value.name);

    this.sharedService.setSelectedRegion(event.value.name);
  }
}
