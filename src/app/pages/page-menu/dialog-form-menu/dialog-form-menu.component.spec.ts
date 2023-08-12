import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogFormMenuComponent } from './dialog-form-menu.component';

describe('DialogFormMenuComponent', () => {
  let component: DialogFormMenuComponent;
  let fixture: ComponentFixture<DialogFormMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogFormMenuComponent]
    });
    fixture = TestBed.createComponent(DialogFormMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
