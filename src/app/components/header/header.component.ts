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
  providers: [CountryService],
})
export class HeaderComponent {
  isDarkMode = false;

  ngOnInit() {
    this.isDarkMode = localStorage.getItem('darkMode') === 'true';
  }

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    localStorage.setItem('darkMode', this.isDarkMode.toString());
    document.body.classList.toggle('dark-theme');
  }
}
