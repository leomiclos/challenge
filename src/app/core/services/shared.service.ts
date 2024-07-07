import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private selectedRegionSubject = new BehaviorSubject<string>('');
  selectedRegion$ = this.selectedRegionSubject.asObservable();

  private searchedNameSubject = new BehaviorSubject<string>('');
  searchedName$ = this.searchedNameSubject.asObservable();

  constructor() {}

  setSelectedRegion(region: string) {
    this.selectedRegionSubject.next(region);
  }



  updateSearchedName(name: string) {
    console.log('SharedService: updateSearchedName called with name:', name);
    this.searchedNameSubject.next(name);
  }


}
