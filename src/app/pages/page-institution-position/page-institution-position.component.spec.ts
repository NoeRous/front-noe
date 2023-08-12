import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageInstitutionPositionComponent } from './page-institution-position.component';

describe('PageInstitutionPositionComponent', () => {
  let component: PageInstitutionPositionComponent;
  let fixture: ComponentFixture<PageInstitutionPositionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PageInstitutionPositionComponent]
    });
    fixture = TestBed.createComponent(PageInstitutionPositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
