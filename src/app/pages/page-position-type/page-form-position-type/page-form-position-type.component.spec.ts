import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageFormPositionTypeComponent } from './page-form-position-type.component';

describe('PageFormPositionTypeComponent', () => {
  let component: PageFormPositionTypeComponent;
  let fixture: ComponentFixture<PageFormPositionTypeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PageFormPositionTypeComponent]
    });
    fixture = TestBed.createComponent(PageFormPositionTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
