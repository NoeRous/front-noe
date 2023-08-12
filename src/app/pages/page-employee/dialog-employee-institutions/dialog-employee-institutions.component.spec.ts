import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEmployeeInstitutionsComponent } from './dialog-employee-institutions.component';

describe('DialogEmployeeInstitutionsComponent', () => {
  let component: DialogEmployeeInstitutionsComponent;
  let fixture: ComponentFixture<DialogEmployeeInstitutionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogEmployeeInstitutionsComponent]
    });
    fixture = TestBed.createComponent(DialogEmployeeInstitutionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
