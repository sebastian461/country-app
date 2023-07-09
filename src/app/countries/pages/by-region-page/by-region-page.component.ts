import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/country.interface';
import { CountryService } from '../../services/countries.service';
import { Region } from '../../interfaces/region.type';

@Component({
  selector: 'countries-by-region-page',
  templateUrl: './by-region-page.component.html',
  styleUrls: ['./by-region-page.component.css'],
})
export class ByRegionPageComponent implements OnInit {
  public countries: Country[] = [];
  public isLoading: boolean = false;

  public regions: Region[] = [
    'Africa',
    'Americas',
    'Asia',
    'Europe',
    'Oceania',
  ];

  public selectedRegion: Region = '';

  constructor(private countryService: CountryService) {}

  ngOnInit(): void {
    this.selectedRegion = this.countryService.cacheStore.byRegion.region;
    this.countries = this.countryService.cacheStore.byRegion.countries;
  }

  searchByRegion(term: Region): void {
    this.selectedRegion = term;
    this.isLoading = true;

    this.countryService.searchRegion(term).subscribe((countries) => {
      this.countries = countries;
      this.isLoading = false;
    });
  }
}
