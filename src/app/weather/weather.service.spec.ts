import { TestBed } from '@angular/core/testing';

import { WeatherService } from './weather.service';
import { appConfig } from '../app.config';
import { defaultWeatherUnits, tempSuffixes, windSuffixes } from '../config';

describe('WeatherService', () => {
  let service: WeatherService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: appConfig.providers,
      teardown: {destroyAfterEach: false},
    });
    service = TestBed.inject(WeatherService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should citiesWeatherSignal does not be available', () => {
    // @ts-ignore
    expect(service.citiesWeatherSignal).toBeTruthy();
  });

  it('should has citiesWeather read only signal', () => {
    expect(service.citiesWeather).toBeTruthy();
  });

  it('should citiesWeather signal be an empty array', () => {
    const cities = service.citiesWeather();
    expect(cities).toBeInstanceOf(Array);
    expect(cities.length).toEqual(0);
  });

  it('should has cityForecast read only signal', () => {
    expect(service.cityForecast).toBeTruthy();
  });

  it('should cityForecast signal be a null value', () => {
    const forecast = service.cityForecast();
    expect(forecast).toBeNull();
  });

  it('should has weatherUnits read only signal', () => {
    expect(service.weatherUnits).toBeTruthy();
  });

  it('should weatherUnits signal has dafault values', () => {
    const units = service.weatherUnits();
    expect(units.units).toEqual(defaultWeatherUnits);
    expect(units.temp).toEqual(tempSuffixes[defaultWeatherUnits]);
    expect(units.wind).toEqual(windSuffixes[defaultWeatherUnits]);
  });
});
