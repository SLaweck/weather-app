import { Component, inject, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { WeatherUnits } from '../../config';
import { WeatherService } from '../../weather/weather.service';

@Component({
  selector: 'app-toolbar',
  imports: [RouterLink, RouterLinkActive, MatToolbarModule, MatIconModule, MatMenuModule, MatButtonModule],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss',
})
export class ToolbarComponent {
  title = input.required<string>();
  weatherService = inject(WeatherService);
  weatherUnits = this.weatherService.weatherUnits;

  onRefreshClicked() {
    console.log('Toolbar: refresh clicked!');
    this.weatherService.refreshCitiesWeather();
  }

  onUnitsMenuClicked(units: WeatherUnits) {
    console.log('Toolbar: switch weather and forecast units to:', units);
    this.weatherService.setWeatherUnits(units);
  }
}
