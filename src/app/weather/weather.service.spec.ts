import { TestBed } from '@angular/core/testing';

import { WeatherService } from './weather.service';
import { appConfig } from '../app.config';

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
});
