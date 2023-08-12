import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageInstitutionTypeComponent } from './page-institution-type.component';

describe('PageInstitutionTypeComponent', () => {
  let component: PageInstitutionTypeComponent;
  let fixture: ComponentFixture<PageInstitutionTypeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PageInstitutionTypeComponent]
    });
    fixture = TestBed.createComponent(PageInstitutionTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
