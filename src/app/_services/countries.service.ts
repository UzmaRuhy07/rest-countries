import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICountry } from '../_models/country';
import { ApiService } from './api.service';
import  {appConstants } from '../_helpers/app-constants';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  constructor(private api: ApiService) { }

  private _countries: ICountry[] = [];

  // to prevent editing of all countries fetched, use getter and setters
  public get countries() : ICountry[] {
    return this._countries;
  }

  public set countries(value : ICountry[]) {
    this._countries = value;
  }

  // Fetch all countries from REST API
  getAllCountries() {
   return  <Observable<ICountry[]>> this.api.get(`${appConstants.endpoint_all}`);
  }

  // Fetch country by code from REST API
  getCountryByCode(code: string) : Observable<ICountry> {
    return  <Observable<ICountry>> this.api.get(`${appConstants.endpoint_code}/${code}`);
  }

  // Fetch countries by region from REST API
  getCountriesByRegion(region: string) {
    return <Observable<ICountry[]>> this.api.get(`${appConstants.endpoint_region}/${region}`);
  }

}
