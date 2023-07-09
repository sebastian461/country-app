import { Component, OnInit } from '@angular/core';
import { CountryService } from '../../services/countries.service';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'countries-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styleUrls: ['./by-capital-page.component.css'],
})
export class ByCapitalPageComponent implements OnInit {
  public countries: Country[] = [];
  public isLoading: boolean = false;
  public initialValue: string = '';

  constructor(private countryService: CountryService) {}

  ngOnInit(): void {
    this.initialValue = this.countryService.cacheStore.byCapital.term;
    this.countries = this.countryService.cacheStore.byCapital.countries;
  }

  searchByCapital(term: string): void {
    this.isLoading = true;

    this.countryService.searchCapital(term).subscribe((countries) => {
      this.countries = countries;
      this.isLoading = false;
    });
  }
}
