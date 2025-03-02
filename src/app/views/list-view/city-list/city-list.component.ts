import { DecimalPipe } from '@angular/common';
import { ChangeDetectorRef, Component, computed, effect, inject } from '@angular/core';
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
  // changeDetectorRef = inject(ChangeDetectorRef);
  citiesWeather = this.weatherService.citiesWeather;
  cityForecast = this.weatherService.cityForecast;
  units = this.weatherService.weatherUnits;
  // myCitiesList = computed(
  //   () => {
  //     const citiesWeather = this.citiesWeather();
  //     return [...citiesWeather];
  //   }
  // );

  cityControl = new FormControl();
  formGroup = new FormGroup({ city: this.cityControl });

  constructor() {
    // this.cityControl.setValue('London')
    effect(
      () => {
        const citiesWeather = this.citiesWeather();
        const cityForecast = this.cityForecast();
        const cityName = this.cityControl.value ? this.cityControl.value[0] : undefined;
        console.log('CityListComponent: effect:', citiesWeather, cityForecast, this.cityControl.value, this.cityControl, this.formGroup);
        if (cityForecast === null && citiesWeather && cityName) {
          console.log('CityListComponent: load city forecast:', cityName, this.cityControl);
          this.weatherService.loadCityForecast(cityName)
          // this.cityControl.setValue(null);
          // console.log('CityListComponent: clear selection:', this.cityControl.value, this.cityControl);
        } else if (!cityName && cityForecast && citiesWeather) {
          const cityName = cityForecast.city.name;
          console.log('CityListComponent: before set selection to:', cityName, cityName, this.cityControl, this.formGroup);
          this.cityControl.setValue([cityName]);
          console.log('CityListComponent: set selection to:', cityName, cityName, this.cityControl, this.formGroup);
        }
        // this.changeDetectorRef.markForCheck();
      }
    );
  }

  onCityListClicked() {
    const cityName = this.cityControl.value ? this.cityControl.value[0] : undefined;
    if (cityName) {
      console.log('Load forecast data for:', cityName, this.cityControl.value);
      this.weatherService.loadCityForecast(cityName);
    }
  }
}
