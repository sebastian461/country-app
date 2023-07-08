import { Component, OnInit } from '@angular/core';
import { CountryService } from '../../services/countries.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Country } from '../../interfaces/country';
import { switchMap } from 'rxjs';

@Component({
  selector: 'countries-country-page',
  templateUrl: './country-page.component.html',
  styleUrls: ['./country-page.component.css'],
})
export class CountryPageComponent implements OnInit {
  public countries: Country[] = [];

  constructor(
    private countriesService: CountryService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) =>
          this.countriesService.searchCountryByAlphaCode(id)
        )
      )
      .subscribe((country) => {
        if (!country) {
          return this.router.navigateByUrl('');
        }

        console.log('Se encontro el país');
        return;
      });
  }
}
