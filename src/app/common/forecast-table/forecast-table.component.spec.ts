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

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
