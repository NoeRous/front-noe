import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagePositionTypeComponent } from './page-position-type.component';

describe('PagePositionTypeComponent', () => {
  let component: PagePositionTypeComponent;
  let fixture: ComponentFixture<PagePositionTypeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PagePositionTypeComponent]
    });
    fixture = TestBed.createComponent(PagePositionTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
