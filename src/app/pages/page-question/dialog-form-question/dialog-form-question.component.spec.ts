import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogFormQuestionComponent } from './dialog-form-question.component';

describe('DialogFormQuestionComponent', () => {
  let component: DialogFormQuestionComponent;
  let fixture: ComponentFixture<DialogFormQuestionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogFormQuestionComponent]
    });
    fixture = TestBed.createComponent(DialogFormQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
