import { Component, effect, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTabChangeEvent, MatTabsModule } from '@angular/material/tabs';
import { WeatherService } from '../../weather/weather.service';
import { DecimalPipe } from '@angular/common';
import { ForecastTableComponent } from "../../common/forecast-table/forecast-table.component";
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-tabs-view',
  imports: [MatTabsModule, MatIconModule, MatProgressSpinnerModule, DecimalPipe, ForecastTableComponent],
  templateUrl: './tabs-view.component.html',
  styleUrl: './tabs-view.component.scss'
})
export class TabsViewComponent {
  weatherService = inject(WeatherService);
  citiesWeather = this.weatherService.citiesWeather;
  cityForecast = this.weatherService.cityForecast;
  units = this.weatherService.weatherUnits;
  selectedIndex!: number;

  constructor() {
    effect(
      () => {
        const citiesWeather = this.citiesWeather();
        const cityForecast = this.cityForecast();
        console.log('Tabs view on signals effect:', citiesWeather, cityForecast, this.selectedIndex);
        if (cityForecast === null && citiesWeather.length > 0) {
          const cityName = citiesWeather[this.selectedIndex || 0].name;
          console.log('Tabs view signal effect: loading city forecast:', cityName);
          this.weatherService.loadCityForecast(cityName);
        } else if (cityForecast && citiesWeather) {
          const cityName = cityForecast.city.name;
          const cityIndex = citiesWeather.findIndex((city) => city.name === cityName);
          if (cityIndex > -1 && cityIndex !== this.selectedIndex) {
            console.log('Tabs view signal effect: set active tab to:', cityName, cityIndex);
            this.selectedIndex = cityIndex;
          }
        }
      }
    );
  }

  onSelectedTabChange(event: MatTabChangeEvent) {
    console.log('Tabs view tab change:', event, this.selectedIndex);
    const cityName = this.citiesWeather()[this.selectedIndex].name;
    this.weatherService.loadCityForecast(cityName);
  }
}
