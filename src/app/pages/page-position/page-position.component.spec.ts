import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagePositionComponent } from './page-position.component';

describe('PagePositionComponent', () => {
  let component: PagePositionComponent;
  let fixture: ComponentFixture<PagePositionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PagePositionComponent]
    });
    fixture = TestBed.createComponent(PagePositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
