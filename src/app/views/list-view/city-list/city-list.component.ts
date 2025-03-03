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
        const citiesWeather = this.citiesWeather();
        const cityForecast = this.cityForecast();
        const cityName = this.cityControl.value ? this.cityControl.value[0] : undefined;
        if (cityForecast === null && citiesWeather && cityName) {
          this.weatherService.loadCityForecast(cityName)
        } else if (!cityName && cityForecast && citiesWeather) {
          const cityName = cityForecast.city.name;
          this.cityControl.setValue([cityName]);
        }
      }
    );
  }

  onCityListClicked() {
    const cityName = this.cityControl.value ? this.cityControl.value[0] : undefined;
    if (cityName) {
      this.weatherService.loadCityForecast(cityName);
    }
  }
}
