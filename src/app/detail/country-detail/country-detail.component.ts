import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CountriesService } from '../../_services/countries.service';
import { faLongArrowAltLeft } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import { ICountry } from '../../_models/country';
import { Location } from '@angular/common';

@Component({
  selector: 'app-country-detail',
  templateUrl: './country-detail.component.html',
  styleUrls: ['./country-detail.component.scss']
})
export class CountryDetailComponent implements OnInit {

  constructor(private router: Router,
    private route: ActivatedRoute,
    private countriesService: CountriesService,
    private location: Location) { }

    faLongArrowLeft = faLongArrowAltLeft; //Icon
  country$: Observable<ICountry>;
  allCountries: ICountry[] = [];


  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.loadCountryDetails(params.get('code'));
    });
    this.prepareAllCountries();
  }

  loadCountryDetails(countryCode: string): void {
    this.country$ = this.countriesService.getCountryByCode(countryCode);
  }

  prepareAllCountries() {
    if (this.countriesService.countries.length) {
      this.allCountries = this.countriesService.countries;
    } else {
        this.countriesService.getAllCountries().subscribe((response: ICountry[]) => {
              this.allCountries = response;
        });
    }
  }

  onBorderCountryPress(borderCountryCode: string): void {
    this.router.navigate(['/detail', borderCountryCode], { relativeTo: this.route });
  }

  onBackPress() {
    this.location.back();
  }

}
