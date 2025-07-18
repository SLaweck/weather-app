import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccordionViewComponent } from './accordion-view.component';
import { appConfig } from '../../app.config';

describe('AccordionViewComponent', () => {
  let component: AccordionViewComponent;
  let fixture: ComponentFixture<AccordionViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccordionViewComponent],
      providers: appConfig.providers,
      teardown: {destroyAfterEach: false},
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccordionViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should have citiesWeather defined', () => {
    expect(component.citiesWeather).toBeDefined();
  });

  it('should have cityForecat defined', () => {
    expect(component.cityForecat).toBeDefined();
  });

  it('should have units defined', () => {
    expect(component.units).toBeDefined();
  });

  it('should initialize selectedCity signal with city name from cityForecat', () => {
    const cityForecast = component.cityForecat();
    if (cityForecast) {
      expect(component.selectedCity()).toBe(cityForecast.city.name);
    } else {
      expect(component.selectedCity()).toBe('');
    }
  });

  it('should call loadCityForecast and set selectedCity on panel open', () => {
    const cityName = 'Amsterdam';
    const loadCityForecastSpy = spyOn(component.weatherService, 'loadCityForecast');
    component.onPanelOpen(cityName);
    expect(loadCityForecastSpy).toHaveBeenCalledWith(cityName);
    expect(component.selectedCity()).toBe(cityName);
  });
});
