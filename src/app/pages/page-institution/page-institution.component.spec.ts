import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageInstitutionComponent } from './page-institution.component';

describe('PageInstitutionComponent', () => {
  let component: PageInstitutionComponent;
  let fixture: ComponentFixture<PageInstitutionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PageInstitutionComponent]
    });
    fixture = TestBed.createComponent(PageInstitutionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
