import { ComponentFixture, TestBed } from '@angular/core/testing';

import { appConfig } from '../../app.config';
import { WeatherService } from '../../weather/weather.service';
import { TabsViewComponent } from './tabs-view.component';
import { Component } from '@angular/core';
import { ForecastTableComponent } from '../../common/forecast-table/forecast-table.component';

@Component({
  selector: 'app-forecast-table',
  standalone: true,
  template: '', // Empty template - its view/logic is not tested here
})
class MockForecastTableComponent {}

describe('TabsViewComponent', () => {
  let component: TabsViewComponent;
  let fixture: ComponentFixture<TabsViewComponent>;
  let weatherServiceMock: any;

  beforeEach(async () => {
    weatherServiceMock = {
      citiesWeather: jasmine.createSpy().and.returnValue([
        {
          name: 'London',
          main: { temp: 15 },
          wind: { speed: 5 },
        },
        {
          name: 'Cardiff',
          main: { temp: 17 },
          wind: { speed: 7 },
        }
      ]),
      cityForecast: jasmine.createSpy().and.returnValue(null),
      weatherUnits: jasmine.createSpy().and.returnValue({ temp: '°C', wind: 'm/s' }),
      loadCityForecast: jasmine.createSpy()
    };

    await TestBed.configureTestingModule({
      imports: [TabsViewComponent],
      providers: [
        appConfig.providers,
        { provide: WeatherService, useValue: weatherServiceMock },
      ],
      teardown: {destroyAfterEach: false},
    })
    .overrideComponent(TabsViewComponent, {
      remove: { imports: [ForecastTableComponent] },    // remove original ForecastTableComponent 
      add: { imports: [MockForecastTableComponent] },   // add mock component
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

  it('should call loadCityForecast in constructor when cityForecast is null and citiesWeather has items', () => {
    expect(weatherServiceMock.loadCityForecast).toHaveBeenCalledWith('London');
  });

  it('should call loadCityForecast with first city when cityForecast is null and citiesWeather is not empty', () => {
    // Arrange
    weatherServiceMock.cityForecast.and.returnValue(null);
    weatherServiceMock.citiesWeather.and.returnValue([
      { name: 'London', main: { temp: 15 }, wind: { speed: 5 } },
      { name: 'Cardiff', main: { temp: 17 }, wind: { speed: 7 } }
    ]);
    // selectedIndex is undefined, so should use index 0

    // Act
    fixture = TestBed.createComponent(TabsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    // Assert
    expect(weatherServiceMock.loadCityForecast).toHaveBeenCalledWith('London');
  });

  it('should call loadCityForecast with selected city when cityForecast is null and selectedIndex is set', () => {
    // Arrange
    weatherServiceMock.cityForecast.and.returnValue(null);
    weatherServiceMock.citiesWeather.and.returnValue([
      { name: 'London', main: { temp: 15 }, wind: { speed: 5 } },
      { name: 'Cardiff', main: { temp: 17 }, wind: { speed: 7 } }
    ]);

    fixture = TestBed.createComponent(TabsViewComponent);
    component = fixture.componentInstance;
    component.selectedIndex = 1; // wybieramy Cardiff
    fixture.detectChanges();

    // Assert
    expect(weatherServiceMock.loadCityForecast).toHaveBeenCalledWith('Cardiff');
  });

  it('should set selectedIndex to cityIndex when cityForecast city exists and selectedIndex is different', async () => {
    // Arrange
    weatherServiceMock.cityForecast.and.returnValue({
      city: { name: 'Cardiff' }
    });
    weatherServiceMock.citiesWeather.and.returnValue([
      { name: 'London', main: { temp: 15 }, wind: { speed: 5 } },
      { name: 'Cardiff', main: { temp: 17 }, wind: { speed: 7 } }
    ]);

    fixture = TestBed.createComponent(TabsViewComponent);
    component = fixture.componentInstance;
    component.selectedIndex = 0; // currently London
    fixture.detectChanges();

    // Assert
    expect(component.selectedIndex).toBe(1); // Cardiff
  });

  it('should NOT change selectedIndex if cityForecast city is already selected', () => {
    // Arrange
    weatherServiceMock.cityForecast.and.returnValue({
      city: { name: 'London' }
    });
    weatherServiceMock.citiesWeather.and.returnValue([
      { name: 'London', main: { temp: 15 }, wind: { speed: 5 } },
      { name: 'Cardiff', main: { temp: 17 }, wind: { speed: 7 } }
    ]);

    fixture = TestBed.createComponent(TabsViewComponent);
    component = fixture.componentInstance;
    component.selectedIndex = 0; // already London
    fixture.detectChanges();

    // Assert
    expect(component.selectedIndex).toBe(0); // remains London
  });

  it('should NOT change selectedIndex if cityForecast city does not exist in citiesWeather', () => {
    // Arrange
    weatherServiceMock.cityForecast.and.returnValue({
      city: { name: 'Edinburgh' }
    });
    weatherServiceMock.citiesWeather.and.returnValue([
      { name: 'London', main: { temp: 15 }, wind: { speed: 5 } },
      { name: 'Cardiff', main: { temp: 17 }, wind: { speed: 7 } }
    ]);

    fixture = TestBed.createComponent(TabsViewComponent);
    component = fixture.componentInstance;
    component.selectedIndex = 0;
    fixture.detectChanges();

    // Assert
    expect(component.selectedIndex).toBe(0); // remains unchanged
  });



// it('should set selectedIndex in constructor when cityForecast is present and city name matches', async () => {
  //   weatherServiceMock.cityForecast.and.returnValue({
  //     city: { name: 'Cardiff' }
  //   });
  //   weatherServiceMock.citiesWeather.and.returnValue([
  //     { name: 'London', main: { temp: 15 }, wind: { speed: 5 } },
  //     { name: 'Cardiff', main: { temp: 17 }, wind: { speed: 7 } }
  //   ]);
  //   // Recreate component to trigger effect
  //   fixture = TestBed.createComponent(TabsViewComponent);
  //   component = fixture.componentInstance;
  //   fixture.detectChanges();
  //   await fixture.whenStable();
  //   fixture.detectChanges();
  //   expect(component.selectedIndex).toBe(1);
  // });

  // it('should not change selectedIndex if city name not found', () => {
  //   weatherServiceMock.cityForecast.and.returnValue({
  //     city: { name: 'Edinburgh' }
  //   });
  //   weatherServiceMock.citiesWeather.and.returnValue([
  //     { name: 'London', main: { temp: 15 }, wind: { speed: 5 } },
  //     { name: 'Cardiff', main: { temp: 17 }, wind: { speed: 7 } }
  //   ]);
  //   fixture = TestBed.createComponent(TabsViewComponent);
  //   component = fixture.componentInstance;
  //   fixture.detectChanges();
  //   expect(component.selectedIndex).toBeUndefined();
  // });

  it('should call loadCityForecast with correct city name on tab change', () => {
    component.selectedIndex = 1;
    weatherServiceMock.citiesWeather.and.returnValue([
      { name: 'London', main: { temp: 15 }, wind: { speed: 5 } },
      { name: 'Cardiff', main: { temp: 17 }, wind: { speed: 7 } }
    ]);
    component.onSelectedTabChange({ index: 0, tab: {} } as any);
    expect(weatherServiceMock.loadCityForecast).toHaveBeenCalledWith('London');
    component.onSelectedTabChange({ index: 1, tab: {} } as any);
    expect(weatherServiceMock.loadCityForecast).toHaveBeenCalledWith('Cardiff');
  });

  it('should not throw an error when citiesWeather array is empty in onSelectedTabChange', () => {
    weatherServiceMock.citiesWeather.and.returnValue([]);
    component.selectedIndex = 0;
    expect(() => component.onSelectedTabChange({ index: 0, tab: {} } as any)).not.toThrow();
  });
});
