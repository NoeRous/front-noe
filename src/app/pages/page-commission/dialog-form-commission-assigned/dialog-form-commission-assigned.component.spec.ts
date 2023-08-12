import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogFormCommissionAssignedComponent } from './dialog-form-commission-assigned.component';

describe('DialogFormCommissionAssignedComponent', () => {
  let component: DialogFormCommissionAssignedComponent;
  let fixture: ComponentFixture<DialogFormCommissionAssignedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogFormCommissionAssignedComponent]
    });
    fixture = TestBed.createComponent(DialogFormCommissionAssignedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
