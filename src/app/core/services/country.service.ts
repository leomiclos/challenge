import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  constructor(
    private http: HttpClient
  ) { }


  api = environment.apiUrl

  getCountries(): Observable<any>{
    return this.http.get<any>(`${this.api}/all/?fields=name,capital,population,flags,region&lang=pt`)
  }


  //extraindo as regiões da lista de países, pois não há um endpoint que traga só as regiões
  getRegions(): Observable<string[]> {
    return this.http.get<any[]>(`${this.api}/all`).pipe(
      map(countries => {
        const regions = countries.map(country => country.region);
        return Array.from(new Set(regions)).sort();
      })
    );
  }


  getCountriesByRegion(region: string): Observable<string[]> {
    return this.http.get<any[]>(this.api).pipe(
      map(countries => {
        const regions = countries.map(country => country.region);
        return Array.from(new Set(regions)).sort();
      })
    );
  }
// `${this.api}/name/${name}`
  getCountriesByName(name: string): Observable<string[]> {
    return this.http.get<any[]>('https://restcountries.com/v3.1/name/%C3%85land%20Islands').pipe(
      map(countries => {
        const name = countries.map(country => country.name);
        return Array.from(new Set(name)).sort();
      })
    );
  }
}
