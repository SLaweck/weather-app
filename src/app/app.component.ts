import { DatePipe, DecimalPipe } from '@angular/common';
import { Component, effect, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterOutlet } from '@angular/router';
import { WeatherService } from './weather/weather.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MainView, tempSuffixes, defaultWeatherUnits, WeatherUnits, windSuffixes } from './config';
import { ToolbarComponent } from "./common/toolbar/toolbar.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [RouterOutlet, DatePipe, DecimalPipe, MatToolbarModule, MatButtonModule, MatIconModule, MatMenuModule, MatListModule, ReactiveFormsModule, ToolbarComponent],
})
export class AppComponent implements OnInit {
  title = 'weather-app';
  weatherService = inject(WeatherService);
  citiesWeather = this.weatherService.citiesWeather;
  cityForecast = this.weatherService.cityForecast;

  mainView: MainView = 'list';
  weatherUnits: WeatherUnits = defaultWeatherUnits;
  tempUnit = tempSuffixes[defaultWeatherUnits];
  windUnit = windSuffixes[defaultWeatherUnits];

  cityControl = new FormControl();
  formGroup = new FormGroup({ city: this.cityControl });


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

  onCityClicked(cityName: string): void {
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

  onViewMenuClicked(mainView: MainView): void {
    this.mainView = mainView;
  }

  onUnitsMenuClicked(units: WeatherUnits): void {
    this.weatherUnits = units;
    this.tempUnit = tempSuffixes[units];
    this.windUnit = windSuffixes[units];  
  }

  onCityListClicked() {
    console.log('Load forecast data for:', this.cityControl.value);
  }

  getDateFromTimestamp(dt: number): Date {
    const date = new Date(dt * 1000);
    return date;
  }
}
