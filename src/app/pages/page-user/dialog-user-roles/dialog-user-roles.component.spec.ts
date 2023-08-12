import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogUserRolesComponent } from './dialog-user-roles.component';

describe('DialogUserRolesComponent', () => {
  let component: DialogUserRolesComponent;
  let fixture: ComponentFixture<DialogUserRolesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogUserRolesComponent]
    });
    fixture = TestBed.createComponent(DialogUserRolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
