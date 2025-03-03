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
});
