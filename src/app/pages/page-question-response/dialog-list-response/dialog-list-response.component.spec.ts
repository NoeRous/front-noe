import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogListResponseComponent } from './dialog-list-response.component';

describe('DialogListResponseComponent', () => {
  let component: DialogListResponseComponent;
  let fixture: ComponentFixture<DialogListResponseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogListResponseComponent]
    });
    fixture = TestBed.createComponent(DialogListResponseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
