import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageFormInstitutionPositionComponent } from './page-form-institution-position.component';

describe('PageFormInstitutionPositionComponent', () => {
  let component: PageFormInstitutionPositionComponent;
  let fixture: ComponentFixture<PageFormInstitutionPositionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PageFormInstitutionPositionComponent]
    });
    fixture = TestBed.createComponent(PageFormInstitutionPositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
