import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogFormQuestionResponseComponent } from './dialog-form-question-response.component';

describe('DialogFormQuestionResponseComponent', () => {
  let component: DialogFormQuestionResponseComponent;
  let fixture: ComponentFixture<DialogFormQuestionResponseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogFormQuestionResponseComponent]
    });
    fixture = TestBed.createComponent(DialogFormQuestionResponseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
