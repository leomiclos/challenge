import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { map, Observable } from 'rxjs';
import { CountryService } from '../../core/services/country.service';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-header',
  standalone: true,
  imports: [HttpClientModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  providers: [CountryService]
})
export class HeaderComponent {




  constructor() {}

    ngOnInit(){
    }



}
