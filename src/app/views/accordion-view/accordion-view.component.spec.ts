import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccordionViewComponent } from './accordion-view.component';

describe('AccordionViewComponent', () => {
  let component: AccordionViewComponent;
  let fixture: ComponentFixture<AccordionViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccordionViewComponent]
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
