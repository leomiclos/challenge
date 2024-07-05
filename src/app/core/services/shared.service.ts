import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private selectedRegionSubject = new BehaviorSubject<string | undefined>(undefined);
  selectedRegion$ = this.selectedRegionSubject.asObservable();

  private searchedNameSubject = new BehaviorSubject<string | undefined>(undefined);
  searchedName$ = this.searchedNameSubject.asObservable();

  constructor() {}

  setSelectedRegion(region: string | undefined) {
    this.selectedRegionSubject.next(region);
  }

  setSearchedName(name: string | undefined) {
    this.searchedNameSubject.next(name);
  }


}
