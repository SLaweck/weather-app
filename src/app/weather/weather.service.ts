import { HttpClient } from '@angular/common/http';
import { inject, Injectable, Signal, signal } from '@angular/core';
import { lastValueFrom, Observable, take } from 'rxjs';
import { appId, citiesList, defaultForecastCnt, forecastUrl, WeatherUnits, defaultWeatherUnits, weatherUrl } from '../config';
import { ForecastData } from './forecast-data.interface';
import { WeatherData } from './weather-data.interface';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private httpClient = inject(HttpClient);
  private citiesWeatherSignal = signal<WeatherData[]>([]);
  citiesWeather = this.citiesWeatherSignal.asReadonly();
  private cityForecastSignal = signal<ForecastData | undefined>(undefined);
  cityForecast = this.cityForecastSignal.asReadonly();
  citiesForecastCache: { [key: string]: ForecastData } = {};

  constructor() {}

  private getCityWeatherObservable(cityName: string, units = defaultWeatherUnits): Observable<WeatherData> {
    return this.httpClient.get<WeatherData>(`${weatherUrl}?q=${cityName}&units=${units}&appid=${appId}`);
  }

  private getCityForecastObservable(cityName: string, units = defaultWeatherUnits, cnt = defaultForecastCnt): Observable<ForecastData> {
    return this.httpClient.get<ForecastData>(`${forecastUrl}?q=${cityName}&units=${units}&cnt=${cnt}&appid=${appId}`);
  }

  async getCityWeather(cityName: string): Promise<WeatherData> {
    console.log('Loading new weather data for:', cityName);
    return await lastValueFrom(this.getCityWeatherObservable(cityName).pipe(take(1)));
  }

  async getCityForecast(cityName: string): Promise<ForecastData> {
    console.log('Loading new forecast data for:', cityName);
    return await lastValueFrom(this.getCityForecastObservable(cityName).pipe(take(1)));
  }

  refreshCitiesWeather(units: WeatherUnits = 'metric'): Signal<WeatherData[]> {
    const getCityWeatherPromises: Promise<WeatherData>[] = [];
    for(const cityName of citiesList) {
      // console.log('Get weather for:', cityName);
      getCityWeatherPromises.push(this.getCityWeather(cityName));
    }
    Promise.all(getCityWeatherPromises).then(
      (citiesWeather) => {
        this.citiesWeatherSignal.set(citiesWeather);
        // for(const cityWeather of this.citiesWeather()) {
        //   console.log('WeatherService: new weather data set for:', cityWeather.name);
        // }
      }
    );
    return this.citiesWeather;
  }

  loadCityForecast(cityName: string): Signal<ForecastData | undefined> {
    if (this.citiesForecastCache[cityName]) {
      const forecast = this.citiesForecastCache[cityName];
      const now = new Date();
      const forecastTime = new Date(forecast.list[0].dt * 1000);
      if (forecast.list[0].dt < now.getTime() / 1000) {
        this.getCityForecast(cityName).then(
          (newForecast) => {
            this.citiesForecastCache[cityName] = newForecast;
            this.cityForecastSignal.set(newForecast);
          }
        );
      } else {
        this.cityForecastSignal.set(forecast);
      }
    } else {
      this.getCityForecast(cityName).then(
        (newForecast) => {
          this.citiesForecastCache[cityName] = newForecast;
          this.cityForecastSignal.set(newForecast);
        }
      );
    }

    return this.cityForecast;
  }
}
