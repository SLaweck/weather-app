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
  private citiesForecastCache: { [key: string]: ForecastData } = {};


  // HTTP request that return Observables
  private getCityWeatherObservable(cityName: string, units: WeatherUnits): Observable<WeatherData> {
    return this.httpClient.get<WeatherData>(`${weatherUrl}?q=${cityName}&units=${units}&appid=${appId}`);
  }
  private getCityForecastObservable(cityName: string, units: WeatherUnits, cnt = defaultForecastCnt): Observable<ForecastData> {
    return this.httpClient.get<ForecastData>(`${forecastUrl}?q=${cityName}&units=${units}&cnt=${cnt}&appid=${appId}`);
  }

  // Async wrap-arounds that returns Promises
  async getCityWeather(cityName: string, units: WeatherUnits): Promise<WeatherData> {
    return await lastValueFrom(this.getCityWeatherObservable(cityName, units).pipe(take(1)));
  }
  async getCityForecast(cityName: string, units: WeatherUnits): Promise<ForecastData> {
    // sets signal to undef when starts requesting forecast for loading indicator
    this.cityForecastSignal.set(undefined);
    return await lastValueFrom(this.getCityForecastObservable(cityName, units).pipe(take(1)));
  }


  refreshCitiesWeather(units: WeatherUnits = this.weatherUnits().units): Signal<WeatherData[]> {
    // clear choosen frecast city when refreshing weather for all cities
    this.citiesWeatherSignal.set([]);
    this.cityForecastSignal.set(null);
    // if units was changed, send them in the signal
    if (units !== this.weatherUnits().units) {
      this.weatherUnitsSignal.set({
        units,
        temp: tempSuffixes[units],
        wind: windSuffixes[units],
      });
    }
    // prepare list of promises for all cities
    const getCityWeatherPromises: Promise<WeatherData>[] = [];
    for(const cityName of citiesList) {
      getCityWeatherPromises.push(this.getCityWeather(cityName, units));
    }
    // Execute all request write array to the signal
    Promise.all(getCityWeatherPromises).then(
      (citiesWeather) => {
        this.citiesWeatherSignal.set(citiesWeather);
      }
    );
    return this.citiesWeather;
  }

  loadCityForecast(cityName: string): Signal<ForecastData | undefined | null> {
    const units = this.weatherUnits().units;
    // check if forecast is in cache
    if (this.citiesForecastCache[cityName]) {
      const forecast = this.citiesForecastCache[cityName];
      const now = new Date();
      const forecastTime = new Date(forecast.list[0].dt * 1000);
      // check if first forecast isn't to old, if has time from the past so request new one
      if (forecast.list[0].dt < now.getTime() / 1000) {
        this.getCityForecast(cityName, units).then(
          (newForecast) => {
            this.citiesForecastCache[cityName] = newForecast;
            this.cityForecastSignal.set(newForecast);
          }
        );
      } else {
        // otherwise serve it from cache
        this.cityForecastSignal.set(forecast);
      }
    } else {
      // if not exist in cache - request it
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
