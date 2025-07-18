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

  it('should refresh cities weather and update signals', async () => {
    const spy = spyOn(service, 'getCityWeather').and.callFake(async (cityName: string, units) => ({
      name: cityName,
      main: { temp: 20 },
      weather: [{ description: 'clear' }],
      wind: { speed: 5 }
    } as any));
    const signal = service.refreshCitiesWeather();
    // Wait for Promise.all to resolve
    await new Promise(resolve => setTimeout(resolve, 10));
    const cities = signal();
    expect(Array.isArray(cities)).toBeTrue();
    expect(cities.length).toBeGreaterThan(0);
    expect(spy).toHaveBeenCalled();
  });

  it('should update weatherUnits signal when refreshing with new units', async () => {
    const newUnits = 'imperial';
    service.refreshCitiesWeather(newUnits as any);
    const units = service.weatherUnits();
    expect(units.units).toEqual(newUnits);
    expect(units.temp).toEqual(tempSuffixes[newUnits]);
    expect(units.wind).toEqual(windSuffixes[newUnits]);
  });

  it('should clear forecast cache when setWeatherUnits is called', () => {
    // @ts-ignore
    service.citiesForecastCache['TestCity'] = { list: [{ dt: Date.now() / 1000 }] } as any;
    service.setWeatherUnits('imperial' as any);
    // @ts-ignore
    expect(Object.keys(service.citiesForecastCache).length).toBe(0);
  });

  it('should load city forecast and update signal', async () => {
    const fakeForecast = { list: [{ dt: Math.floor(Date.now() / 1000) + 1000 }] } as any;
    spyOn(service, 'getCityForecast').and.returnValue(Promise.resolve(fakeForecast));
    const signal = service.loadCityForecast('TestCity');
    await new Promise(resolve => setTimeout(resolve, 10));
    expect(signal()).toEqual(fakeForecast);
  });

  it('should use cached forecast if not outdated', async () => {
    const cachedForecast = { list: [{ dt: Math.floor(Date.now() / 1000) + 1000 }] } as any;
    // @ts-ignore
    service.citiesForecastCache['CachedCity'] = cachedForecast;
    const signal = service.loadCityForecast('CachedCity');
    await new Promise(resolve => setTimeout(resolve, 10));
    expect(signal()).toEqual(cachedForecast);
  });

  it('should request new forecast if cached forecast is outdated', async () => {
    const outdatedForecast = { list: [{ dt: Math.floor(Date.now() / 1000) - 1000 }] } as any;
    // @ts-ignore
    service.citiesForecastCache['OldCity'] = outdatedForecast;
    const newForecast = { list: [{ dt: Math.floor(Date.now() / 1000) + 2000 }] } as any;
    spyOn(service, 'getCityForecast').and.returnValue(Promise.resolve(newForecast));
    const signal = service.loadCityForecast('OldCity');
    await new Promise(resolve => setTimeout(resolve, 10));
    expect(signal()).toEqual(newForecast);
  });
});
