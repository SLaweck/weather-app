import { Component, computed, effect, inject } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { WeatherService } from '../../weather/weather.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DatePipe, DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-forecast-table',
  imports: [MatTableModule, MatProgressSpinnerModule, DatePipe, DecimalPipe],
  templateUrl: './forecast-table.component.html',
  styleUrl: './forecast-table.component.scss'
})
export class ForecastTableComponent {
  weatherService = inject(WeatherService);
  cityForecast = this.weatherService.cityForecast;
  units = this.weatherService.weatherUnits;
  forecastList = computed(
    () => {
      console.log('Forecast table list:', this.cityForecast()?.list)
      return this.cityForecast()?.list || [];
    }
  );
  displayedColumns: string[] = ['datetime', 'weather', 'temp', 'feels_like', 'temp_min', 'temp_max', 'pressure', 'wind', 'gust'];
}
