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

  ngOnInit() {

    setTimeout(() => {
      this.weatherService.refreshCitiesWeather();
    }, 0);

  }
}
