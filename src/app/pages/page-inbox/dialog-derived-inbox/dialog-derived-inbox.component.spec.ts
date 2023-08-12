import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDerivedInboxComponent } from './dialog-derived-inbox.component';

describe('DialogDerivedInboxComponent', () => {
  let component: DialogDerivedInboxComponent;
  let fixture: ComponentFixture<DialogDerivedInboxComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogDerivedInboxComponent]
    });
    fixture = TestBed.createComponent(DialogDerivedInboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
