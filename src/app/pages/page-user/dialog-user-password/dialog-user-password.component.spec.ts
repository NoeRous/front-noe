import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogUserPasswordComponent } from './dialog-user-password.component';

describe('DialogUserPasswordComponent', () => {
  let component: DialogUserPasswordComponent;
  let fixture: ComponentFixture<DialogUserPasswordComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogUserPasswordComponent]
    });
    fixture = TestBed.createComponent(DialogUserPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
