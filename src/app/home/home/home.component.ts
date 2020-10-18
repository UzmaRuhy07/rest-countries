import { Component, OnInit } from '@angular/core';
import { ICountry } from 'src/app/_models/country';
import { CountriesService } from 'src/app/_services/countries.service';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { appConstants } from 'src/app/_helpers/app-constants';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  faSearch = faSearch; //Icon
  countries: ICountry[] = [];
  filteredCountries: ICountry[] = [];
  regions = [];
  filtersForm: FormGroup;


  constructor(private countriesService: CountriesService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private spinnerService: NgxSpinnerService) {

    this.regions = appConstants.regions;
    this.filtersForm = this.formBuilder.group({
      search: [null],
      regionFilter: [null]
    });

  }

  ngOnInit(): void {
    // depending on the params fetch countries by region or all countries
    this.route.queryParamMap.subscribe((paramsMap) => {
      this.filtersForm.setValue({ search: null, regionFilter: paramsMap.get('region') });
      paramsMap.has('region') ? this.loadCountriesByRegion(paramsMap.get('region')) : this.loadAllCountries();
    });
  }

  //Fetches all countries
  loadAllCountries(): void {
    this.spinnerService.show();
    this.countriesService.getAllCountries().subscribe((response: ICountry[]) => {
      this.spinnerService.hide();
      if (response) {
        this.countries = this.filteredCountries = response;
        this.countriesService.countries = response;
      }
    });
  }

  //Fetches all countries by region
  loadCountriesByRegion(region: string): void {
    this.spinnerService.show();
    this.countriesService.getCountriesByRegion(region).subscribe(
      (response: ICountry[]) => {
        this.spinnerService.hide();
        if (response) {
          this.countries = this.filteredCountries = response;
        }
      },
      (error) => {
        this.spinnerService.hide();
        // if fails to get countries, show not found page
        this.router.navigate(['errorpage'], { relativeTo: this.route });
      });
  }

  // When user filters by region, re-route, so that we can support bookmark loading
  handleFilterByRegion(): void {
    const selectedRegion = this.filtersForm.get('regionFilter').value;
    this.router.navigate(['/countries'], { queryParams: { region: selectedRegion === "null" ? null : selectedRegion } });
  }

  //filter searched country, from all/region countries collection
  handleSearchByName(): void {
    const searchQuery = this.filtersForm.get('search').value;
    this.filteredCountries = this.countries.filter((country) => {
      return country.name.toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1;
    });

  }


}
