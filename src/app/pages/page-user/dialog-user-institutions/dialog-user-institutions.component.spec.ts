import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogUserInstitutionsComponent } from './dialog-user-institutions.component';

describe('DialogUserInstitutionsComponent', () => {
  let component: DialogUserInstitutionsComponent;
  let fixture: ComponentFixture<DialogUserInstitutionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogUserInstitutionsComponent]
    });
    fixture = TestBed.createComponent(DialogUserInstitutionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
