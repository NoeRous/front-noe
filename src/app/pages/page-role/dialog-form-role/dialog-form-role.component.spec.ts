import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogFormRoleComponent } from './dialog-form-role.component';

describe('DialogFormRoleComponent', () => {
  let component: DialogFormRoleComponent;
  let fixture: ComponentFixture<DialogFormRoleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogFormRoleComponent]
    });
    fixture = TestBed.createComponent(DialogFormRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
