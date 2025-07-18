import { Component, effect, inject, Injector, runInInjectionContext } from '@angular/core';
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
  private injector = inject(Injector);
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
        runInInjectionContext(this.injector, () => {
          if (cityForecast === null && citiesWeather.length > 0) {
            const cityName = citiesWeather[this.selectedIndex || 0].name;
            this.weatherService.loadCityForecast(cityName);
          } else if (cityForecast && citiesWeather) {
            const cityName = cityForecast.city.name;
            const cityIndex = citiesWeather.findIndex((city) => city.name === cityName);
            if (cityIndex > -1 && cityIndex !== this.selectedIndex) {
              this.selectedIndex = cityIndex;
            }
          }
        });
      },
      { injector: this.injector },
    );
  }

  onSelectedTabChange(event: MatTabChangeEvent) {
    const cities = this.citiesWeather();
    if (cities.length > event.index && event.index >= 0) {
      const cityName = cities[event.index].name;
      this.weatherService.loadCityForecast(cityName);
    }
  }
}
