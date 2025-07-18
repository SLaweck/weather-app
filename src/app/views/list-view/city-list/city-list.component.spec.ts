import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CityListComponent } from './city-list.component';
import { appConfig } from '../../../app.config';

describe('CityListComponent', () => {
  let component: CityListComponent;
  let fixture: ComponentFixture<CityListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CityListComponent],
      providers: appConfig.providers,
      teardown: {destroyAfterEach: false},
    })
    .compileComponents();

    fixture = TestBed.createComponent(CityListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a FormGroup with city control', () => {
    expect(component.formGroup.contains('city')).toBeTrue();
    expect(component.cityControl).toBeTruthy();
  });

  it('should call loadCityForecast when onCityListClicked is triggered with a city selected', () => {
    const spy = spyOn(component.weatherService, 'loadCityForecast');
    component.cityControl.setValue(['London']);
    component.onCityListClicked();
    expect(spy).toHaveBeenCalledWith('London');
  });

  it('should not call loadCityForecast when onCityListClicked is triggered with no city selected', () => {
    const spy = spyOn(component.weatherService, 'loadCityForecast');
    component.cityControl.setValue([]);
    component.onCityListClicked();
    expect(spy).not.toHaveBeenCalled();
  });

  it('should initialize citiesWeather, cityForecast, and units from weatherService', () => {
    expect(component.citiesWeather).toBeDefined();
    expect(component.cityForecast).toBeDefined();
    expect(component.units).toBeDefined();
  });
});
