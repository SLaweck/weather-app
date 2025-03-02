import { Component, inject, signal } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { WeatherService } from '../../weather/weather.service';
import { ForecastTableComponent } from "../../common/forecast-table/forecast-table.component";
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-accordion-view',
  imports: [MatExpansionModule, MatIconModule, MatProgressSpinnerModule, ForecastTableComponent, DecimalPipe],
  templateUrl: './accordion-view.component.html',
  styleUrl: './accordion-view.component.scss'
})
export class AccordionViewComponent {
  weatherService = inject(WeatherService);
  citiesWeather = this.weatherService.citiesWeather;
  cityForecat = this.weatherService.cityForecast;
  units = this.weatherService.weatherUnits;

  selectedCity = signal<string>(this.cityForecat()?.city.name || '');

  onPanelOpen(cityName: string) {
    this.weatherService.loadCityForecast(cityName);
    this.selectedCity.set(cityName);
  }
}
