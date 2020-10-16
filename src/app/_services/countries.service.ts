import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICountry } from '../_models/country';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  constructor(private api: ApiService) { }

  private _countries: ICountry[] = [];

  public get countries() : ICountry[] {
    return this._countries;
  }

  public set countries(value : ICountry[]) {
    this._countries = value;
  }



  getAllCountries() {
   return this.api.get(`all`);
  }

  getCountryByCode(code: string) : Observable<ICountry> {
    return  <Observable<ICountry>> this.api.get(`alpha/${code}`);
  }

  getCountriesByRegion(region: string) {
    return this.api.get(`region/${region}`);
  }

}
