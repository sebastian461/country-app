import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/country.interface';
import { CountryService } from '../../services/countries.service';

@Component({
  selector: 'countries-by-country-page',
  templateUrl: './by-country-page.component.html',
  styleUrls: ['./by-country-page.component.css'],
})
export class ByCountryPageComponent implements OnInit {
  public countries: Country[] = [];
  public initialValue: string = '';
  public isLoading: boolean = false;

  constructor(private countryService: CountryService) {}

  ngOnInit(): void {
    this.initialValue = this.countryService.cacheStore.byCountry.term;
    this.countries = this.countryService.cacheStore.byCountry.countries;
  }

  searchByCountry(term: string): void {
    this.isLoading = true;

    this.countryService.searchCounty(term).subscribe((countries) => {
      this.countries = countries;
      this.isLoading = false;
    });
  }
}
