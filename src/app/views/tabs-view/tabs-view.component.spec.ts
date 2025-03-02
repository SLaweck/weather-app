import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabsViewComponent } from './tabs-view.component';

describe('TabsViewComponent', () => {
  let component: TabsViewComponent;
  let fixture: ComponentFixture<TabsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabsViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TabsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
