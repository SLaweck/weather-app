import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolbarComponent } from './toolbar.component';
import { appConfig } from '../../app.config';

describe('ToolbarComponent', () => {
  let component: ToolbarComponent;
  let fixture: ComponentFixture<ToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToolbarComponent],
      providers: appConfig.providers,
      teardown: {destroyAfterEach: false},
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToolbarComponent);
    fixture.componentRef.setInput('title', 'WeatherApp');
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should have the 'WeatherApp' title`, () => {
    expect(component.title()).toEqual('WeatherApp');
  });

  it('should call refreshCitiesWeather when onRefreshClicked is called', () => {
    const spy = spyOn(component.weatherService, 'refreshCitiesWeather');
    component.onRefreshClicked();
    expect(spy).toHaveBeenCalled();
  });

  it('should call setWeatherUnits with correct units when onUnitsMenuClicked is called', () => {
    const spy = spyOn(component.weatherService, 'setWeatherUnits');
    const units = 'imperial';
    component.onUnitsMenuClicked(units);
    expect(spy).toHaveBeenCalledWith(units);
  });

  it('should have weatherUnits from weatherService', () => {
    expect(component.weatherUnits).toBe(component.weatherService.weatherUnits);
  });

  it('should render mat-toolbar element', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('mat-toolbar')).not.toBeNull();
  });
});
