import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CountriesService } from '../../_services/countries.service';
import { faLongArrowAltLeft } from '@fortawesome/free-solid-svg-icons';
import { ICountry } from '../../_models/country';
import { Location } from '@angular/common';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-country-detail',
  templateUrl: './country-detail.component.html',
  styleUrls: ['./country-detail.component.scss']
})
export class CountryDetailComponent implements OnInit {

  constructor(private router: Router,
    private route: ActivatedRoute,
    private countriesService: CountriesService,
    private location: Location,
    private spinnerService: NgxSpinnerService) { }

  faLongArrowLeft = faLongArrowAltLeft; //Icon
  country: ICountry;
  allCountries: ICountry[] = [];


  ngOnInit(): void {
    //To support bookmark loading, using country code
    this.route.paramMap.subscribe(params => {
      this.loadCountryDetails(params.get('code'));
    });
    this.prepareAllCountries();
  }

  // Fetch full details of the country
  loadCountryDetails(countryCode: string): void {
    this.countriesService.getCountryByCode(countryCode).subscribe(
      (response) => {
        this.spinnerService.hide();
        this.country = response;
      },
      (error) => { //Error callback
        this.spinnerService.hide();
        this.router.navigate(['errorpage'], { relativeTo: this.route });
      }
    );
  }

  /* when navigated from home, use already fetched countries avoid API call,
  *  incase of bookmark loading fetch all countries to get border names
  */
  prepareAllCountries(): void{
    if (this.countriesService.countries.length) {
      this.allCountries = this.countriesService.countries;
    } else {
      this.countriesService.getAllCountries().subscribe((response: ICountry[]) => {
        this.allCountries = response;
      });
    }
  }

  // When clicked on border button, re-route with border country code
  onBorderCountryPress(borderCountryCode: string): void {
    this.router.navigate(['/detail', borderCountryCode], { relativeTo: this.route });
  }

  // on back button press, use angular location service to navigate to previous page
  onBackPress() {
    this.location.back();
  }


}
