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

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
