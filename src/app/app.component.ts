import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WeatherService } from './weather/weather.service';
import { WeatherData } from './weather/weather-data.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [RouterOutlet],
})
export class AppComponent {
  title = 'weather-app';

  constructor(readonly service: WeatherService) {
    // service.getCityWeather('Cardiff').subscribe(
    //   (weather) => console.log(weather)
    // );
    const gets = [service.getCityWeather('Cardiff'), service.getCityWeather('London')];
    Promise.all(gets).then(
      (value) => console.log(value),
    );
  }
}
