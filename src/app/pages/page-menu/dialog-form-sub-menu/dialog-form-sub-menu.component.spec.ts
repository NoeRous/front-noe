import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogFormSubMenuComponent } from './dialog-form-sub-menu.component';

describe('DialogFormSubMenuComponent', () => {
  let component: DialogFormSubMenuComponent;
  let fixture: ComponentFixture<DialogFormSubMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogFormSubMenuComponent]
    });
    fixture = TestBed.createComponent(DialogFormSubMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
