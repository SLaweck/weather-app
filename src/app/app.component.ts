import { Component, effect, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WeatherService } from './weather/weather.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [RouterOutlet, DatePipe],
})
export class AppComponent implements OnInit {
  title = 'weather-app';
  weatherService = inject(WeatherService);
  citiesWeather = this.weatherService.citiesWeather;
  cityForecast = this.weatherService.cityForecast;

  constructor() {
    effect(
      () => {
        for(const cityWeather of this.citiesWeather()) {
          console.log('AppComponent: detected new weather data for:', cityWeather.name, 'temp feels like:', cityWeather.main.feels_like);
        }
      }
    );
    effect(
      () => {
        const forecast = this.cityForecast();
        if (forecast) {
          console.log('AppComponent: detected new forecast data for:', forecast.city.name, 'on:', forecast.list[0].dt_txt, 'temp feels like:', forecast.list[0].main.feels_like);
        } else {
          console.log('AppComponent: detected forecast data clearing!');
        }
        console.log('AppComponent: Forecast', forecast);
      }
    );
  }

  ngOnInit() {

    // const gets = [service.getCityWeather('Cardiff'), service.getCityWeather('London')];
    // Promise.all(gets).then(
    //   (value) => console.log(value),
    // );

    // this.weatherService.refreshCitiesWeather();

    setTimeout(() => {
      this.weatherService.refreshCitiesWeather();
    }, 5000);

    // this.weatherService.getCityForecast('Cardiff').then(
    //   (value) => {
    //     console.log(value);
    //     console.log('Forecast for:', value.city.name, 'on:', value.list[0].dt_txt, 'temp feels like:', value.list[0].main.feels_like);
    //   }
    // );
    // this.weatherService.getCityForecast('London').then(
    //   (value) => {
    //     console.log(value);
    //     console.log('Forecast for:', value.city.name, 'on:', value.list[0].dt_txt, 'temp feels like:', value.list[0].main.feels_like);
    //   }
    // );
  }

  onCityClicker(cityName: string): void {
    this.weatherService.loadCityForecast(cityName);
    // this.weatherService.getCityForecast(cityName).then(
    //   (value) => {
    //     console.log(value);
    //     console.log('Forecast for:', value.city.name, 'on:', value.list[0].dt_txt, 'temp feels like:', value.list[0].main.feels_like);
    //   }
    // );
  }

  onRefreshClicked(): void {
    this.weatherService.refreshCitiesWeather();
  }

  getDateFromTimestamp(dt: number): Date {
    const date = new Date(dt * 1000);
    return date;
  }
}
