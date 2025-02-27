import { Injectable } from '@angular/core';
import { WeatherData } from './weather-data.interface';
import { HttpClient } from '@angular/common/http';
import { weatherUrl, appId } from '../config';
import { lastValueFrom, Observable, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(readonly http: HttpClient) { }

  // getCityWeather(cityName: string): Observable<WeatherData> {
  //   return this.http.get<WeatherData>(`${weatherUrl}?q=${cityName}&units=metric&appid=${appId}`);
  // }

  async getCityWeather(cityName: string): Promise<WeatherData> {
    return await lastValueFrom(this.http.get<WeatherData>(`${weatherUrl}?q=${cityName}&units=metric&appid=${appId}`).pipe(take(1)));
  }
}
