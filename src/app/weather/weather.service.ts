import { HttpClient } from '@angular/common/http';
import { inject, Injectable, Signal, signal } from '@angular/core';
import { lastValueFrom, Observable, take } from 'rxjs';
import { appId, citiesList, defaultForecastCnt, forecastUrl, WeatherUnits, defaultWeatherUnits, weatherUrl, tempSuffixes, windSuffixes } from '../config';
import { ForecastData } from './forecast-data.interface';
import { WeatherData } from './weather-data.interface';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private httpClient = inject(HttpClient);

  // define internal writable signals
  private citiesWeatherSignal = signal<WeatherData[]>([]);
  private cityForecastSignal = signal<ForecastData | undefined | null>(null);
  private weatherUnitsSignal = signal<{units: WeatherUnits, temp: string, wind: string}>({
    units: defaultWeatherUnits,
    temp: tempSuffixes[defaultWeatherUnits],
    wind: windSuffixes[defaultWeatherUnits],
  });

  // expose signals as readonly
  citiesWeather = this.citiesWeatherSignal.asReadonly();
  cityForecast = this.cityForecastSignal.asReadonly();
  weatherUnits = this.weatherUnitsSignal.asReadonly();

  // cache for forecast requests
  citiesForecastCache: { [key: string]: ForecastData } = {};

  constructor() {}

  // HTTP request that return Observables
  private getCityWeatherObservable(cityName: string, units: WeatherUnits): Observable<WeatherData> {
    return this.httpClient.get<WeatherData>(`${weatherUrl}?q=${cityName}&units=${units}&appid=${appId}`);
  }
  private getCityForecastObservable(cityName: string, units: WeatherUnits, cnt = defaultForecastCnt): Observable<ForecastData> {
    return this.httpClient.get<ForecastData>(`${forecastUrl}?q=${cityName}&units=${units}&cnt=${cnt}&appid=${appId}`);
  }

  // Async wrap-arounds that returns Promises
  async getCityWeather(cityName: string, units: WeatherUnits): Promise<WeatherData> {
    console.log('Loading new weather data for:', cityName);
    return await lastValueFrom(this.getCityWeatherObservable(cityName, units).pipe(take(1)));
  }
  async getCityForecast(cityName: string, units: WeatherUnits): Promise<ForecastData> {
    console.log('Loading new forecast data for:', cityName);
    // sets signal to undef when starts requesting forecast for loading indicator
    this.cityForecastSignal.set(undefined);
    return await lastValueFrom(this.getCityForecastObservable(cityName, units).pipe(take(1)));
  }


  refreshCitiesWeather(units: WeatherUnits = this.weatherUnits().units): Signal<WeatherData[]> {
    // clear choosen frecast city when refreshing weather for all cities
    this.citiesWeatherSignal.set([]);
    this.cityForecastSignal.set(null);
    if (units !== this.weatherUnits().units) {
      this.weatherUnitsSignal.set({
        units,
        temp: tempSuffixes[units],
        wind: windSuffixes[units],
      });
    }
    const getCityWeatherPromises: Promise<WeatherData>[] = [];
    for(const cityName of citiesList) {
      // console.log('Get weather for:', cityName);
      getCityWeatherPromises.push(this.getCityWeather(cityName, units));
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

  loadCityForecast(cityName: string): Signal<ForecastData | undefined | null> {
    const units = this.weatherUnits().units;
    if (this.citiesForecastCache[cityName]) {
      const forecast = this.citiesForecastCache[cityName];
      const now = new Date();
      const forecastTime = new Date(forecast.list[0].dt * 1000);
      if (forecast.list[0].dt < now.getTime() / 1000) {
        this.getCityForecast(cityName, units).then(
          (newForecast) => {
            this.citiesForecastCache[cityName] = newForecast;
            this.cityForecastSignal.set(newForecast);
          }
        );
      } else {
        this.cityForecastSignal.set(forecast);
      }
    } else {
      this.getCityForecast(cityName, units).then(
        (newForecast) => {
          this.citiesForecastCache[cityName] = newForecast;
          this.cityForecastSignal.set(newForecast);
        }
      );
    }

    return this.cityForecast;
  }

  setWeatherUnits(units: WeatherUnits) {
    // when switching units forecast cache has to be cleared
    this.citiesForecastCache = {};
    this.refreshCitiesWeather(units);
  }
}
