import { Component, effect, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToolbarComponent } from "./common/toolbar/toolbar.component";
import { WeatherService } from './weather/weather.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [RouterOutlet, ToolbarComponent]
})
export class AppComponent implements OnInit {
  title = 'WeatherApp';
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
        } else if (forecast === null) {
          console.log('AppComponent: detected forecast data clearing!');
        }
        console.log('AppComponent: Forecast', forecast);
      }
    );
  }

  ngOnInit() {

    setTimeout(() => {
      this.weatherService.refreshCitiesWeather();
    }, 2000);

  }
}
