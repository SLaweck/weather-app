import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForecastTableComponent } from './forecast-table.component';

describe('ForecastTableComponent', () => {
  let component: ForecastTableComponent;
  let fixture: ComponentFixture<ForecastTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ForecastTableComponent]
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
