import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabsViewComponent } from './tabs-view.component';
import { appConfig } from '../../app.config';
import { WeatherData } from '../../weather/weather-data.interface';
import { ForecastData } from '../../weather/forecast-data.interface';

describe('TabsViewComponent', () => {
  let component: TabsViewComponent;
  let fixture: ComponentFixture<TabsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabsViewComponent],
      providers: appConfig.providers,
      teardown: {destroyAfterEach: false},
    })
    .compileComponents();

    fixture = TestBed.createComponent(TabsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have initial selectedIndex undefined', () => {
    expect(component.selectedIndex).toBeUndefined();
  });

  it('should call loadCityForecast when onSelectedTabChange is triggered', () => {
    const spy = spyOn(component.weatherService, 'loadCityForecast');
    // Mock citiesWeather to return array with one city
    spyOn(component, 'citiesWeather').and.returnValue([{
      name: 'London',
      coord: { lon: 0, lat: 0 },
      weather: [],
      base: '',
      main: { temp: 0, feels_like: 0, temp_min: 0, temp_max: 0, pressure: 0, humidity: 0, sea_level: 0, grnd_level: 0 },
      visibility: 0,
      wind: { speed: 0, deg: 0 },
      clouds: { all: 0 },
      dt: 0,
      sys: { type: 0, id: 0, country: '', sunrise: 0, sunset: 0 },
      timezone: 0,
      id: 0,
      cod: 0
    }]);
    component.selectedIndex = 0;
    component.onSelectedTabChange({ index: 0, tab: {} } as any);
    expect(spy).toHaveBeenCalledWith('London');
  });
});
