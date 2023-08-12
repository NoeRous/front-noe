import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageShowDetailsTrackingComponent } from './page-show-details-tracking.component';

describe('PageShowDetailsTrackingComponent', () => {
  let component: PageShowDetailsTrackingComponent;
  let fixture: ComponentFixture<PageShowDetailsTrackingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PageShowDetailsTrackingComponent]
    });
    fixture = TestBed.createComponent(PageShowDetailsTrackingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
