import { DecimalPipe } from '@angular/common';
import { Component, effect, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { WeatherService } from '../../../weather/weather.service';

@Component({
  selector: 'app-city-list',
  imports: [ReactiveFormsModule, MatListModule, MatIconModule, MatProgressSpinnerModule, DecimalPipe],
  templateUrl: './city-list.component.html',
  styleUrl: './city-list.component.scss'
})
export class CityListComponent {
  weatherService = inject(WeatherService)
  citiesWeather = this.weatherService.citiesWeather;
  cityForecast = this.weatherService.cityForecast;
  units = this.weatherService.weatherUnits;

  cityControl = new FormControl();
  formGroup = new FormGroup({ city: this.cityControl });

  constructor() {
    effect(
      () => {
        if (this.cityForecast() === null) {
          this.cityControl.setValue(undefined);
        }
      }
    );
  }

  onCityListClicked() {
    console.log('Load forecast data for:', this.cityControl.value);
    this.weatherService.loadCityForecast(this.cityControl.value);
  }
}
