import { Component, OnInit } from '@angular/core';
import { ICountry } from 'src/app/_models/country';
import { CountriesService } from 'src/app/_services/countries.service';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  faSearch = faSearch; //Icon
  allCountries: ICountry[] = [];
  countries: ICountry[] = [];
  filteredCountries: ICountry[] = [];
  regions = [];
  filtersForm: FormGroup;


  constructor(private countriesService: CountriesService,
              private router: Router,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder) {

      this.regions = [
                      {name: null,text:'Filter By Region'},
                      {name:'africa',text:'Africa'},
                      {name:'americas',text:'Americas'},
                      {name:'asia',text:'Asia'},
                      {name:'europe',text:'Europe'},
                      {name:'oceania',text:'Oceania'}
                    ];

      this.filtersForm = this.formBuilder.group({
                            search: [null],
                            regionFilter:[null]
                         });
   }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((paramsMap) => {
          console.log(paramsMap);
          this.filtersForm.setValue({search: null, regionFilter: paramsMap.get('region')});
          paramsMap.has('region') ? this.loadCountriesByRegion(paramsMap.get('region')) : this.loadAllCountries();
    });
  }

  loadAllCountries() : void{
      this.countriesService.getAllCountries().subscribe((response: ICountry[] ) => {
        if (response) {
          this.countries = this.filteredCountries = response;
          this.countriesService.countries = response;
        }
      });
  }

  loadCountriesByRegion(region:string) : void{
    this.countriesService.getCountriesByRegion(region).subscribe((response: ICountry[] ) => {
      if (response) {
        this.countries = this.filteredCountries = response;
      }
    });
}

  handleFilterByRegion(): void {
    this.countries = [];
    const selectedRegion = this.filtersForm.get('regionFilter').value;
    this.router.navigate(['/countries'], {queryParams: { region: selectedRegion === "null" ? null: selectedRegion }});
  }

  handleSearchByName() : void {
    console.log(this.filtersForm.get('search').value);
    const searchQuery = this.filtersForm.get('search').value;
   this.filteredCountries = this.countries.filter( (country) => {
           return country.name.toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1;
    });

  }

}
