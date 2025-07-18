import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForecastTableComponent } from './forecast-table.component';
import { appConfig } from '../../app.config';

describe('ForecastTableComponent', () => {
  let component: ForecastTableComponent;
  let fixture: ComponentFixture<ForecastTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ForecastTableComponent],
      providers: appConfig.providers,
      teardown: {destroyAfterEach: false},
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForecastTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should have displayedColumns defined', () => {
    expect(component.displayedColumns).toEqual([
      'datetime',
      'weather',
      'temp',
      'feels_like',
      'temp_min',
      'temp_max',
      'pressure',
      'wind',
      'gust'
    ]);
  });

  it('should have weatherService injected', () => {
    expect(component.weatherService).toBeTruthy();
  });

  it('should have forecastList as an array', () => {
    const forecast = component.forecastList();
    expect(Array.isArray(forecast)).toBeTrue();
  });

  it('should have units defined from weatherService', () => {
    expect(component.units).toBe(component.weatherService.weatherUnits);
  });
});
